using Internal;
using System;
using MySql.Data.MySqlClient;

public class GeekTextServer
{
	public Connection()
	{
        Response.Write("hello");
        Console.Write("heelo");
        string myConnectionString = "server=localhost;database=GeekText_DB;uid=jyepe;pwd=9373yepe;";

        MySqlConnection cnn = new MySqlConnection(connetionString);

        try
        {
            cnn.Open();
            Response.Write("hello");
            Response.End();
            cnn.Close();
        }
        catch (Exception ex)
        {
            Response.Write("hello");
            Response.End();
        }
    }
}
