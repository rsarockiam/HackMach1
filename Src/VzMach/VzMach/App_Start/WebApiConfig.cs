using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Routing;

namespace VzMach
{
    public static class WebApiConfig
    {
        public static string UrlPrefix { get { return "WebApi"; } }
        public static string UrlPrefixRelative { get { return "~/WebApi"; } }

        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: WebApiConfig.UrlPrefix + "/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }

        public static void Register(RouteCollection routes)
        {
            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: WebApiConfig.UrlPrefix + "/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
