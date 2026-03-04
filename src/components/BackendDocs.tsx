import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackendDocs: React.FC = () => {
  const navigate = useNavigate();

  const copy = (text: string, e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(text);
    const btn = e.currentTarget;
    btn.innerText = '✅ Másolva';
    setTimeout(() => btn.innerText = 'Másolás', 2000);
  };

  const styles = {
    wrapper: { backgroundColor: '#1e1e1e', color: '#d4d4d4', minHeight: '100vh', padding: '40px 20px', fontFamily: "'Segoe UI', Consolas, monospace" },
    container: { maxWidth: '1000px', margin: '0 auto' },
    backBtn: { backgroundColor: '#333', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', marginBottom: '20px', borderRadius: '2px' },
    card: { backgroundColor: '#252526', border: '1px solid #333', padding: '25px', marginBottom: '40px', borderRadius: '4px' },
    codeBox: { backgroundColor: '#181818', padding: '15px', borderRadius: '4px', position: 'relative' as const, marginTop: '10px', border: '1px solid #404040' },
    copyBtn: { position: 'absolute' as const, right: '10px', top: '10px', backgroundColor: '#007acc', color: '#fff', border: 'none', padding: '5px 10px', fontSize: '0.75rem', cursor: 'pointer', borderRadius: '2px' },
    h1: { color: '#fff', fontSize: '2.2rem', marginBottom: '10px' },
    h2: { color: '#569cd6', fontSize: '1.6rem', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' },
    h3: { color: '#4ec9b0', fontSize: '1.2rem', marginTop: '20px', marginBottom: '10px' },
    text: { lineHeight: '1.6', marginBottom: '10px' },
    highlight: { color: '#ce9178', backgroundColor: '#2d2d2d', padding: '2px 5px', borderRadius: '3px' },
    ol: { paddingLeft: '20px', marginBottom: '20px', color: '#ccc' },
    li: { marginBottom: '10px' }
  };

  const Code = ({ code, filename }: { code: string, filename?: string }) => (
    <div style={styles.codeBox}>
      {filename && <div style={{ color: '#858585', fontSize: '0.8rem', marginBottom: '5px' }}>{filename}</div>}
      <button style={styles.copyBtn} onClick={(e) => copy(code, e)}>Másolás</button>
      <pre style={{ margin: 0, fontSize: '0.9rem', color: '#d4d4d4', overflowX: 'auto', lineHeight: '1.5' }}>{code}</pre>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>← Vissza</button>
        <h1 style={styles.h1}>Tanórák Backend (NestJS + Prisma)</h1>
        <p style={{ color: '#858585', marginBottom: '40px' }}>Inicializálás, Relációk és Seeding folyamat</p>

        {/* 0. PROJEKT KEZDÉS */}
        <section style={styles.card}>
          <h2 style={styles.h2}>0. Függőségek telepítése</h2>
          <Code code={`npm install\nnpm install class-validator class-transformer\nnpm install @faker-js/faker`} />
        </section>

        {/* 1/A MUNKASTRATÉGIA */}
        <section style={styles.card}>
          <h2 style={styles.h2}>1/A. Munkafolyamat: Meglévő adatbázis esetén</h2>
          <ol style={styles.ol}>
            <li style={styles.li}><strong>DB Pull:</strong> <code style={styles.highlight}>npx prisma db pull</code></li>
            <li style={styles.li}><strong>Nest Resource:</strong> <code style={styles.highlight}>nest g resource lessons</code></li>
            <li style={styles.li}><strong>Séma kiegészítés:</strong> Relációk és <code style={styles.highlight}>conducted_lessons</code> tábla hozzáadása</li>
            <li style={styles.li}><strong>Generate:</strong> <code style={styles.highlight}>npx prisma generate</code></li>
            <li style={styles.li}><strong>DB Push:</strong> <code style={styles.highlight}>npx prisma db push</code></li>
            <li style={styles.li}><strong>Seed:</strong> <code style={styles.highlight}>npx prisma db seed</code></li>
          </ol>
        </section>

        {/* 1/B MUNKASTRATÉGIA */}
        <section style={styles.card}>
          <h2 style={styles.h2}>1/B. Munkafolyamat: Építés nulláról</h2>
          <ol style={styles.ol}>
            <li style={styles.li}><strong>Nest Resource:</strong> <code style={styles.highlight}>nest g resource lessons</code></li>
            <li style={styles.li}><strong>Prisma séma:</strong> Modellek (<code style={styles.highlight}>lessons</code>, <code style={styles.highlight}>conducted_lessons</code>) megírása</li>
            <li style={styles.li}><strong>Generate:</strong> <code style={styles.highlight}>npx prisma generate</code></li>
            <li style={styles.li}><strong>DB Push:</strong> <code style={styles.highlight}>npx prisma db push</code></li>
            <li style={styles.li}><strong>Seed:</strong> <code style={styles.highlight}>npx prisma db seed</code></li>
          </ol>
        </section>

        {/* PRISMA SCHEMA */}
        <section style={styles.card}>
          <h2 style={styles.h2}>2. Prisma séma és Relációk</h2>
          <Code 
            filename="prisma/schema.prisma"
            code={`model lessons {\n  id              Int                 @id @default(autoincrement())\n  subject         String              @db.VarChar(50)\n  teacher         String              @db.VarChar(100)\n  class_level     String              @db.VarChar(20)\n  scheduled_hours Decimal             @db.Decimal(4, 1)\n  conducted       conducted_lessons[]\n}\n\nmodel conducted_lessons {\n  id             Int      @id @default(autoincrement())\n  lesson_id      Int\n  conducted_date DateTime @default(now())\n  lesson         lessons  @relation(fields: [lesson_id], references: [id])\n}`} 
          />
        </section>

        {/* SEEDING */}
        <section style={styles.card}>
          <h2 style={styles.h2}>3. Adatfeltöltés (Seeding)</h2>
          <p style={styles.text}>Futtatás: <code style={styles.highlight}>npx prisma db seed</code> vagy <code style={styles.highlight}>npx tsx prisma/seed.ts</code></p>
          <Code 
            filename="prisma/seed.ts"
            code={`import { PrismaClient } from "generated/prisma/client";\nimport { faker } from "@faker-js/faker";\n\nconst prisma = new PrismaClient();\n\nasync function main() {\n  const allLessons = await prisma.lessons.findMany();\n\n  for (let i = 0; i < 10; i++) {\n    await prisma.conducted_lessons.create({\n      data: {\n        lesson_id: allLessons[Math.floor(Math.random() * allLessons.length)].id,\n        conducted_date: faker.date.recent()\n      }\n    });\n  }\n}\n\nmain().then(async () => await prisma.$disconnect());`} 
          />
        </section>

        {/* DTO */}
        <section style={styles.card}>
          <h2 style={styles.h2}>4. Adatátvitel (DTO)</h2>
          <Code 
            filename="src/lessons/dto/create-lesson.dto.ts"
            code={`import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";\n\nexport class CreateLessonDto {\n  @IsNotEmpty() @IsString() subject: string;\n  @IsNotEmpty() @IsString() teacher: string;\n  @IsNotEmpty() @IsString() class_level: string;\n  @IsNotEmpty() @IsNumber() @Min(0) scheduled_hours: number;\n}`} 
          />
        </section>

        {/* SERVICE */}
        <section style={styles.card}>
          <h2 style={styles.h2}>5. Üzleti logika (Service)</h2>
          <Code 
            filename="src/lessons/lessons.service.ts"
            code={`import { Injectable, NotFoundException } from '@nestjs/common';\nimport { PrismaService } from '../prisma.service';\nimport { CreateLessonDto } from './dto/create-lesson.dto';\n\n@Injectable()\nexport class LessonsService {\n  constructor(private readonly prisma: PrismaService) {}\n\n  findAll() {\n    return this.prisma.lessons.findMany();\n  }\n\n  create(dto: CreateLessonDto) {\n    return this.prisma.lessons.create({ data: dto });\n  }\n\n  async conductLesson(id: number) {\n    const lesson = await this.prisma.lessons.findUnique({ where: { id } });\n    if (!lesson) throw new NotFoundException("Nincs ilyen tanóra!");\n\n    return this.prisma.conducted_lessons.create({\n      data: { lesson_id: id }\n    });\n  }\n}`} 
          />
        </section>

        {/* CONTROLLER */}
        <section style={styles.card}>
          <h2 style={styles.h2}>6. Végpontok (Controller)</h2>
          <Code 
            filename="src/lessons/lessons.controller.ts"
            code={`@Controller('lessons')\nexport class LessonsController {\n  constructor(private readonly service: LessonsService) {}\n\n  @Get()\n  findAll() { return this.service.findAll(); }\n\n  @Post()\n  create(@Body() dto: CreateLessonDto) { return this.service.create(dto); }\n\n  @Post(':id/conducted')\n  conduct(@Param('id') id: string) {\n    return this.service.conductLesson(+id);\n  }\n}`} 
          />
        </section>

        <footer style={{ textAlign: 'center', padding: '20px', color: '#555' }}>
          NestJS / Prisma API Architecture - 2026
        </footer>
      </div>
    </div>
  );
};

export default BackendDocs;