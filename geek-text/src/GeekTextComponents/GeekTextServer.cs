using System;
using MySql.Data.MySqlClient;

public class GeekTextServer
{
	public Connection()
	{
        string myConnectionString = "server=localhost;database=GeekText_DB;uid=jyepe;pwd=9373yepe;";

        MySqlConnection cnn = new MySqlConnection(connetionString);

        try
        {
            cnn.Open();
            MessageBox.Show("Connection Open ! ");
            cnn.Close();
        }
        catch (Exception ex)
        {
            MessageBox.Show("Can not open connection ! ");
        }
    }
}
