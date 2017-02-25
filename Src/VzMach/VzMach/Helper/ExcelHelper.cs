using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.IO;
using System.Data.OleDb;
namespace VzMach.Helper
{
    public class ExcelHelper
    {
        public static DataSet LoadDataSetFromExcel(string filePath)
        {

            DataSet ds=new DataSet();
            DataTable dt = null,dt2=null;
            if (Path.GetExtension(filePath).Contains("xls"))
            {
                OleDbConnection objConn = null;
                OleDbDataAdapter oleDA = null;

                try
                {

                    string conn = "Provider=Microsoft.ACE.OLEDB.12.0; " +  "data source='" + filePath + "';" + "Extended Properties=\"Excel 12.0;HDR=YES;IMEX=1\" ";
                    objConn = new OleDbConnection(conn);
                    objConn.Open();
                   
                    oleDA = new OleDbDataAdapter("select * from [Sheet1$]", objConn);
                    dt = new DataTable();
                    oleDA.Fill(dt);
                    ds.Tables.Add(dt);
                    try
                    {
                        oleDA = new OleDbDataAdapter("select * from [Sheet2$]", objConn);
                        dt2 = new DataTable();
                        oleDA.Fill(dt2);
                        ds.Tables.Add(dt2);
                    }
                    catch { }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (oleDA != null)
                        oleDA.Dispose();
                    if (objConn != null)
                        objConn.Dispose();
                }
            }
            return ds;
        }       
    }
}
