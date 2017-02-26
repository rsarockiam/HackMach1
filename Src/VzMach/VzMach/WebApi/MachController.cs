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

namespace VzMach.WebApi
{
    public class MachController : ApiController
    {

        #region LocationDetails
        [Route("~/WebApi/GetLocaionDetails")]
        [HttpGet]
        public IHttpActionResult GetLocaionDetails(string type = "")
        {
            const string DATA = @"{""object"":{""name"":""Name""}}";
            string response = string.Empty;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://ip-api.com/json/" + type);
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
        public IHttpActionResult GetRecommendPlans(string type = "")
        {

            dynamic RecommendPlans = null;
            return RecommendPlans;
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