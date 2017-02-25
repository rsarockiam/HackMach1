using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Dynamic;

namespace VzMach.WebApi
{
    public class MachController : ApiController
    {
        #region LocationDetails
        [Route("~/WebApi/GetLocaionDetails")]
        [HttpGet]
        #endregion
        public IHttpActionResult GetLocaionDetails(string type="")
        {

            dynamic location = null;
            return location;
        }

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