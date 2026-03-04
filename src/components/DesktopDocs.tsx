import React from 'react';
import { useNavigate } from 'react-router-dom';

const DesktopDocs: React.FC = () => {
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
    ol: { paddingLeft: '20px', marginBottom: '20px', color: '#ccc' },
    li: { marginBottom: '15px' },
    highlight: { color: '#ce9178', backgroundColor: '#2d2d2d', padding: '2px 5px', borderRadius: '3px' }
  };

  const Code = ({ code }: { code: string }) => (
    <div style={styles.codeBox}>
      <button style={styles.copyBtn} onClick={(e) => copy(code, e)}>Másolás</button>
      <pre style={{ margin: 0, fontSize: '0.9rem', color: '#d4d4d4', overflowX: 'auto', lineHeight: '1.5' }}>{code}</pre>
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>← Vissza a kezdőlapra</button>
        <h1 style={styles.h1}>Asztali alkalmazás dokumentáció</h1>
        <p style={{ color: '#858585', marginBottom: '40px' }}>C# .NET WPF & Console hibrid architektúra konfigurációja</p>

        {/* 1. FEJEZET: KONFIGURÁCIÓ ÉS ALAPOK */}
        <section style={styles.card}>
          <h2 style={styles.h2}>1. Projekt inicializálás és konfiguráció</h2>
          
          <ol style={styles.ol}>
            <li style={styles.li}>
              <strong>NuGet csomag telepítése:</strong>
              <p style={styles.text}>Az adatbázis kapcsolathoz telepítsd a következő csomagot:</p>
              <Code code={`Install-Package MySql.Data`} />
            </li>

            <li style={styles.li}>
              <strong>Dupla kattintás a projekt nevére:</strong>
              <p style={styles.text}>A megnyíló <code style={styles.highlight}>.csproj</code> fájlba szúrd be a manuális belépési pontot:</p>
              <Code code={`<StartupObject>gyakorlas.Program</StartupObject>`} />
            </li>
            
            <li style={styles.li}>
              <strong>Konzolos kimenet engedélyezése:</strong>
              <p style={styles.text}>Jobb katt a projektre → <code style={styles.highlight}>Properties</code> → Az <code style={styles.highlight}>Output type</code> legyen <strong>Console Application</strong>.</p>
            </li>

            <li style={styles.li}>
              <strong>Debug profil:</strong>
              <p style={styles.text}>Debug menü, profil duplikálása (<code style={styles.highlight}>gyakorlasConsole</code>), arguments:</p>
              <Code code={`--stat`} />
            </li>
          </ol>

          <h3 style={styles.h3}>Program.cs (public class Program)</h3>
          <Code code={`[STAThread]\npublic static void Main (string[] args)\n{\n    if (args.Length > 0 && args[0] == "--stat")\n    {\n        Statisztika statisztika = new Statisztika();\n        statisztika.RunConsole();\n    }\n    else\n    {\n        var app = new App();\n        app.InitializeComponent();\n        app.Run();\n    }\n}`} />

          <h3 style={styles.h3}>Db.cs (public static class Db)</h3>
          <Code code={`public static class Db\n{\n    private const string ConnStr = "Server=localhost;Port=3306;Database=codecamp;Uid=root;Pwd=;";\n    public static MySqlConnection Open()\n    {\n        var conn = new MySqlConnection(ConnStr);\n        conn.Open();\n        return conn;\n    }\n}`} />

          <h3 style={styles.h3}>Course.cs (public class Course)</h3>
          <Code code={`public class Course\n{\n    public int Id { get; }\n    public string Name { get; }\n    public string Type { get; }\n    public int Length { get; }\n    public string Instructor { get; }\n\n    public Course(int id, string name, string type, int length, string instructor)\n    {\n        Id = id;\n        Name = name;\n        Type = type;\n        Length = length;\n        Instructor = instructor;\n    }\n\n    public override string ToString() => $"{Id} - {Name} - {Type} - {Length} - {Instructor}";\n}`} />
        </section>

        {/* 2. FEJEZET: STATISZTIKA */}
        <section style={styles.card}>
          <h2 style={styles.h2}>2. Statisztikai algoritmusok (Statisztika.cs)</h2>
          <h3 style={styles.h3}>Adatstruktúra és Futtatás</h3>
          <Code code={`public class Statisztika\n{\n    public List<Course> Course { get; set; } = new List<Course>();\n\n    public void RunConsole()\n    {\n        if (!LoadCourses())\n        {\n            Console.WriteLine("Adatbázis hiba történt!");\n            Console.ReadLine();\n            return;\n        }\n        else\n        {\n            GroupCount();\n            LongestCourse();\n            SearchCourse();\n        }\n    }\n}`} />

          <h3 style={styles.h3}>Számítási metódusok</h3>
          <Code code={`public void GroupCount()\n{\n    var count = 0;\n    foreach (var course in Course)\n    {\n        if(course.Type == "group") count++;\n    }\n    Console.WriteLine($"Group képzések száma: {count}db");\n}\n\npublic void LongestCourse()\n{\n    var longest = Course[0];\n    foreach (var course in Course)\n    {\n        if (course.Length > longest.Length) longest = course;\n    }\n    Console.WriteLine($"Leghosszabb: {longest.Name} ({longest.Length})");\n}\n\npublic void SearchCourse()\n{\n    Console.Write("Képzés neve:");\n    var name = Console.ReadLine();\n    foreach (var course in Course)\n    {\n        if (course.Name == name)\n        {\n            Console.WriteLine($"Oktató: {course.Instructor}");\n            return;\n        }\n    }\n    Console.WriteLine("Nincs ilyen képzés!");\n}`} />
        </section>

        {/* 3. FEJEZET: XAML */}
        <section style={styles.card}>
          <h2 style={styles.h2}>3. Grafikus felület (MainWindow.xaml)</h2>
          <Code code={`<Grid Margin="12">\n    <Grid.RowDefinitions>\n        <RowDefinition Height="Auto"/>\n        <RowDefinition Height="*"/>\n    </Grid.RowDefinitions>\n    <ListBox x:Name="CoursesList" Grid.Row="1"/>\n    <Button Content="Törlés" Width="110" HorizontalAlignment="Left" Click="Button_Click"/>\n</Grid>`} />
        </section>

        {/* 4. FEJEZET: CODE-BEHIND */}
        <section style={styles.card}>
          <h2 style={styles.h2}>4. WPF Adatkezelés (MainWindow.xaml.cs)</h2>
          
          <h3 style={styles.h3}>Adatbetöltés és Frissítés</h3>
          <Code code={`public void ReloadCourses()\n{\n    if (!statisztika.LoadCourses())\n    {\n        MessageBox.Show("Adatbázis hiba történt", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);\n        return;\n    }\n    CoursesList.Items.Clear();\n    foreach (var course in statisztika.Course)\n    {\n        CoursesList.Items.Add(course);\n    }\n}`} />

          <h3 style={styles.h3}>Törlés gomb eseménykezelője</h3>
          <Code code={`private void Button_Click(object sender, RoutedEventArgs e)\n{\n    if (CoursesList.SelectedItem == null)\n    {\n        MessageBox.Show("Nincs kijelölve kurzus!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);\n        return;\n    }\n\n    var result = MessageBox.Show("Biztos törölni szeretnéd?", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Question);\n    if (result == MessageBoxResult.Yes)\n    {\n        var selected = (Course)CoursesList.SelectedItem;\n        if (statisztika.DeleteCourse(selected.Id))\n        {\n            MessageBox.Show("Sikeres törlés!");\n            ReloadCourses();\n        }\n    }\n}`} />

          <h3 style={styles.h3}>Adatelérés és Törlés logikája (Statisztika.cs)</h3>
          <Code code={`public bool LoadCourses()\n{\n    try {\n        Course.Clear();\n        var conn = Db.Open();\n        var cmd = new MySqlCommand("SELECT id, name, type, length, instructor FROM records WHERE kind='course';", conn);\n        var reader = cmd.ExecuteReader();\n        while (reader.Read()) {\n            Course.Add(new Course(reader.GetInt32("id"), reader.GetString("name"), reader.GetString("type"), reader.GetInt32("length"), reader.GetString("instructor")));\n        }\n        return true;\n    } catch { return false; }\n}\n\npublic bool DeleteCourse(int id)\n{\n    try {\n        var conn = Db.Open();\n        var cmd = new MySqlCommand("DELETE FROM records WHERE id=@id", conn);\n        cmd.Parameters.AddWithValue("id", id);\n        return cmd.ExecuteNonQuery() > 0;\n    } catch { return false; }\n}`} />
        </section>

        <footer style={{ textAlign: 'center', padding: '20px', color: '#555' }}>
          Visual Studio Documentation - 2026
        </footer>
      </div>
    </div>
  );
};

export default DesktopDocs;