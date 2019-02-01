using Internal;
using System;
using MySql.Data.MySqlClient;

public static class GeekTextServer
{
    [HttpGet]
	static void start()
	{
        return "hello";
        string myConnectionString = "server=localhost;database=GeekText_DB;uid=jyepe;pwd=9373yepe;";
        

        MySqlConnection cnn = new MySqlConnection(myConnectionString);

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
