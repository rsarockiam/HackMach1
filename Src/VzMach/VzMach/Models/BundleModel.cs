using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VzMach.Models
{
    public class BundleModel
    {
        public string BundleId { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string DAT { get; set; }
        public string TV { get; set; }
        public string VOICE { get; set; }
        public string ROUTER { get; set; }
        public string Discount { get; set; }
        public string Keyword { get; set; }

    }
    public class RecommendModel
    {
        public List<BundleModel> ZipPopularBundle { get; set; }
        public List<BundleModel> CntryPopularBundle { get; set; }
        public List<BundleModel> SubPopularBundle { get; set; }
    }
}