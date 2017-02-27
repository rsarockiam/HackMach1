﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Dynamic;
using VzMach.Helper;
using VzMach.Models;
using System.IO;
using System.Data;
using System.Web.SessionState;

namespace VzMach.WebApi
{
    public class MachController : ApiController
    {
        DataSet Data { get { return ExcelHelper.ExcelData; } }
        const string zipPopular = "ZIPPOPULAR"; const string countryPopular = "COUNTRYPOPULAR"; const string subbndlValue = "SubBundleValue";
        const string newlyaddedbundle = "NEWLYADDED";
        public HttpSessionState Session { get; }
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
            RecommendModel recModel = new RecommendModel();
            recModel.NewlyReleasedBundle = new List<BundleModel>();
            recModel.CntryPopularBundle = new List<BundleModel>();
            recModel.ZipPopularBundle = new List<BundleModel>();
            recModel.SubPopularBundle = new List<BundleModel>();

            var x = Data.Tables[0].AsEnumerable().FirstOrDefault(tt => (tt.Field<string>("Zipcode") == ZipCode));
            var zipPop = x[zipPopular].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);
            var cntryPop = x[countryPopular].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);
            var subbndl = x[subbndlValue].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);
            var newlyadded = x[newlyaddedbundle].ToString().Split(new string[] { (",") }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var popbundId in zipPop)
            {

                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                {
                    BundleModel bun = new BundleModel();
                    bun.BundleId = row["BundleId"].ToString();
                    bun.Type = row["Type"].ToString();
                    bun.Name = row["Name"].ToString();
                    bun.Price = row["Price"].ToString();
                    bun.DAT = row["DAT"].ToString();
                    bun.TV = row["TV"].ToString();
                    bun.VOICE = row["VOICE"].ToString();
                    bun.ROUTER = row["ROUTER"].ToString();
                    bun.Discount = row["Discount"].ToString();
                    bun.Keyword = row["Keyword"].ToString();
                    recModel.ZipPopularBundle.Add(bun);
                }
            }
            foreach (var popbundId in cntryPop)
            {


                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                {
                    BundleModel bun = new BundleModel();
                    bun.BundleId = row["BundleId"].ToString();
                    bun.Type = row["Type"].ToString();
                    bun.Name = row["Name"].ToString();
                    bun.Price = row["Price"].ToString();
                    bun.DAT = row["DAT"].ToString();
                    bun.TV = row["TV"].ToString();
                    bun.VOICE = row["VOICE"].ToString();
                    bun.ROUTER = row["ROUTER"].ToString();
                    bun.Discount = row["Discount"].ToString();
                    bun.Keyword = row["Keyword"].ToString();
                    recModel.CntryPopularBundle.Add(bun);
                }
            }
            foreach (var popbundId in subbndl)
            {

                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                {
                    BundleModel bun = new BundleModel();
                    bun.BundleId = row["BundleId"].ToString();
                    bun.Type = row["Type"].ToString();
                    bun.Name = row["Name"].ToString();
                    bun.Price = row["Price"].ToString();
                    bun.DAT = row["DAT"].ToString();
                    bun.TV = row["TV"].ToString();
                    bun.VOICE = row["VOICE"].ToString();
                    bun.ROUTER = row["ROUTER"].ToString();
                    bun.Discount = row["Discount"].ToString();
                    bun.Keyword = row["Keyword"].ToString();
                    recModel.SubPopularBundle.Add(bun);
                }
            }
            foreach (var popbundId in newlyadded)
            {

                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == popbundId.Trim());
                if (row != null)
                {
                    BundleModel bun = new BundleModel();
                    bun.BundleId = row["BundleId"].ToString();
                    bun.Type = row["Type"].ToString();
                    bun.Name = row["Name"].ToString();
                    bun.Price = row["Price"].ToString();
                    bun.DAT = row["DAT"].ToString();
                    bun.TV = row["TV"].ToString();
                    bun.VOICE = row["VOICE"].ToString();
                    bun.ROUTER = row["ROUTER"].ToString();
                    bun.Discount = row["Discount"].ToString();
                    bun.Keyword = row["Keyword"].ToString();
                    recModel.NewlyReleasedBundle.Add(bun);
                }
            }

            return Json(JsonConvert.SerializeObject(recModel));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">CORE/COMP</param>
        /// <returns></returns>

        #region GetAllBundles
        [Route("~/WebApi/GetAllBundlesByType")]
        [HttpGet]
        #endregion

        public IHttpActionResult GetAllBundlesByType(string type = "")
        {

            List<BundleModel> Bundles = new List<BundleModel>();
            foreach (DataRow row in Data.Tables[1].Rows)
            {
                if (row != null)
                {
                    if (!string.IsNullOrWhiteSpace(type) && row["Type"].ToString().Trim() != type)
                        continue;
                    BundleModel bun = new BundleModel();
                    bun.BundleId = row["BundleId"].ToString();
                    bun.Type = row["Type"].ToString();
                    bun.Name = row["Name"].ToString();
                    bun.Price = row["Price"].ToString();
                    bun.DAT = row["DAT"].ToString();
                    bun.TV = row["TV"].ToString();
                    bun.VOICE = row["VOICE"].ToString();
                    bun.ROUTER = row["ROUTER"].ToString();
                    bun.Discount = row["Discount"].ToString();
                    bun.Keyword = row["Keyword"].ToString();
                    Bundles.Add(bun);
                }
            }

            return Json(JsonConvert.SerializeObject(Bundles));
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="type">CORE/COMP</param>
        /// <returns></returns>

        #region UpdateAddress
        [Route("~/WebApi/UpdateAdderss")]
        [HttpPost]
        #endregion

        public void UpdateAddress(Address address)
        {
            Session.Add("Address", address);
        }


        #region UpdateCart
        [Route("~/WebApi/UpdateCart")]
        [HttpPost]
        #endregion

        public void UpdateCart(string BundleId)
        {
            Session["BundleId"] = BundleId;
        }

        #region GetCart
        [Route("~/WebApi/GetCart")]
        [HttpGet]
        #endregion

        public IHttpActionResult GetCart()
        {
            BundleModel bun = new BundleModel();
            if (Session["BundleId"] != null)
            {
                var row = Data.Tables[1].AsEnumerable().FirstOrDefault(d => d.Field<string>("BundleId") == Session["BundleId"].ToString().Trim());
                if (row != null)
                {
                    bun.BundleId = row["BundleId"].ToString();
                    bun.Type = row["Type"].ToString();
                    bun.Name = row["Name"].ToString();
                    bun.Price = row["Price"].ToString();
                    bun.DAT = row["DAT"].ToString();
                    bun.TV = row["TV"].ToString();
                    bun.VOICE = row["VOICE"].ToString();
                    bun.ROUTER = row["ROUTER"].ToString();
                    bun.Discount = row["Discount"].ToString();
                    bun.Keyword = row["Keyword"].ToString();
                }
            }
            return Json(JsonConvert.SerializeObject(bun));
        }

    }
}