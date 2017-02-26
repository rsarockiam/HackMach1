using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Dynamic;
using VzMach.Helper;
using System.IO;
using System.Data;

namespace VzMach.WebApi
{
    public class MachController : ApiController
    {
        DataSet Data { get { return ExcelHelper.ExcelData; } }
        const string  zipPopular= "ZIPPOPULAR"; const string countryPopular = "COUNTRYPOPULAR"; const string subbndlValue = "SubBundleValue";
        #region LocationDetails
        [Route("~/WebApi/GetLocaionDetails")]
        [HttpGet]
        public IHttpActionResult GetLocaionDetails(string IPaddress)
        {
            const string DATA = @"{""object"":{""name"":""Name""}}";
            string response = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://ip-api.com/json/" + IPaddress);
            request.Method = "POST";
            request.ContentType = "application/json";
            request.ContentLength = DATA.Length;
            StreamWriter requestWriter = new StreamWriter(request.GetRequestStream(), System.Text.Encoding.ASCII);
            requestWriter.Write(DATA);
            requestWriter.Close();
            WebResponse webResponse = request.GetResponse();
            Stream webStream = webResponse.GetResponseStream();
            StreamReader responseReader = new StreamReader(webStream);
            response = responseReader.ReadToEnd();
            responseReader.Close();
            return Json(response);
        }
        #endregion

        #region RecommendPlans
        [Route("~/WebApi/GetRecommendPlans")]
        [HttpGet]
        #endregion
        public IHttpActionResult GetRecommendPlans(string ZipCode)
        {
            List<DataRow> zipPopularBundle = new List<DataRow>();
            List<DataRow> cntryPopularBundle = new List<DataRow>();
            List<DataRow> subPopularBundle = new List<DataRow>();

            var x = Data.Tables[0].AsEnumerable().FirstOrDefault(tt => (tt.Field<string>("Zipcode") == ZipCode));
            var zipPop = x[zipPopular].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);
            var cntryPop = x[countryPopular].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);
            var subbndl = x[subbndlValue].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var popbundId in zipPop)
            {
                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                    zipPopularBundle.Add(row);
            }
            foreach (var popbundId in cntryPop)
            {
                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                    cntryPopularBundle.Add(row);
            }
            foreach (var popbundId in subbndl)
            {
                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                    subPopularBundle.Add(row);
            }



            dynamic RecommendPlans = new ExpandoObject();
            RecommendPlans.ZipPopular = zipPopularBundle;
            RecommendPlans.CountryPopular = cntryPopularBundle;
            RecommendPlans.subPopular = subPopularBundle;
            return Json(JsonConvert.SerializeObject(RecommendPlans));
        }


        #region GetBundles
        [Route("~/WebApi/GetBundles")]
        [HttpGet]
        #endregion
        public IHttpActionResult GetBundles(string type = "")
        {

            dynamic GetBundles = null;
            return GetBundles;
        }





    }
}