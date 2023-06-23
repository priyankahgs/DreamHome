using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DreamHome.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
        public PartialViewResult Service()
        {

            return PartialView("~/Views/Home/Service.cshtml");
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost] 
        public JsonResult InsertData(String Name,String EmailId,String Telephone,String Location,string Source,String Campaign,String Medium,string PreviousUrl,string City,string PreferredLanguage,string DoingUpFor,string DoingInteriorsFor,string PageType)
        {
            try { 
            string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["bergerConnectionString"].ConnectionString;

                SqlConnection cnn = new SqlConnection(cnnString);
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = cnn;
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.CommandText = "DreamHomeInsert";
            cmd.Parameters.Add("@ReturnVal", SqlDbType.Int).Direction = ParameterDirection.Output;
            cmd.Parameters.Add("@Name", SqlDbType.VarChar).Value = Name;
             cmd.Parameters.Add("@Email", SqlDbType.VarChar).Value = EmailId;
             cmd.Parameters.Add("@Telephone", SqlDbType.VarChar).Value = Telephone;
             cmd.Parameters.Add("@Location", SqlDbType.VarChar).Value = Location;
             cmd.Parameters.Add("@Source", SqlDbType.VarChar).Value = Source;
             cmd.Parameters.Add("@Medium", SqlDbType.VarChar).Value = Medium ;
             cmd.Parameters.Add("@Campaign", SqlDbType.VarChar).Value = Campaign;
             cmd.Parameters.Add("@Term", SqlDbType.VarChar).Value = "" ;
             cmd.Parameters.Add("@Keyword", SqlDbType.VarChar).Value = "";
             cmd.Parameters.Add("@AcceptedTerms", SqlDbType.VarChar).Value = "1";
             cmd.Parameters.Add("@UrlReferrer", SqlDbType.VarChar).Value = PreviousUrl;
                cmd.Parameters.Add("@City", SqlDbType.VarChar).Value = City;
                cmd.Parameters.Add("@PreferredLanguage", SqlDbType.VarChar).Value = PreferredLanguage;
                cmd.Parameters.Add("@DoingUpFor", SqlDbType.VarChar).Value = DoingUpFor;
                cmd.Parameters.Add("@DoingInteriorsFor", SqlDbType.VarChar).Value = DoingInteriorsFor;
                cmd.Parameters.Add("@PageType", SqlDbType.VarChar, 2000).Value = PageType;
                cmd.Parameters.Add("@ErrorMessage", SqlDbType.VarChar,2000).Direction = ParameterDirection.Output;

            //add any parameters the stored procedure might require
            cnn.Open();
            object o = cmd.ExecuteScalar();
            cnn.Close();
            var result = (int)cmd.Parameters["@ReturnVal"].Value;
            if(result == 1)
            return Json(new { succeeded = true, message = "Success" });
            else
                return Json(new { succeeded = false, message = (string)cmd.Parameters["@ErrorMessage"].Value });
            }
            catch (Exception ex)
            {
                return Json(new { succeeded = false, message = ex.Message});
            }
        }
        [HttpGet]
        public ActionResult HindiPageRedirect()
        {
            return View("~/Views/Home/Index_Hindi.cshtml");
        }
        [HttpGet]
        public ActionResult EnglishPageRedirect()
        {
            return View("~/Views/Home/Index.cshtml");
        }
        [HttpPost]
        public JsonResult InserPaintertData(String Name, String Telephone, String Pincode, String City, string State, string PreferredLanguage, string IsAssociated, String Campaign, String Source, String Medium, string PreviousUrl)
        {
            try
            {
                string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["bergerConnectionString"].ConnectionString;

                SqlConnection cnn = new SqlConnection(cnnString);
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cnn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandText = "PainterLandingInsert";
                cmd.Parameters.Add("@ReturnVal", SqlDbType.Int).Direction = ParameterDirection.Output;
                cmd.Parameters.Add("@Name", SqlDbType.VarChar).Value = Name;
                cmd.Parameters.Add("@Telephone", SqlDbType.VarChar).Value = Telephone;
                cmd.Parameters.Add("@Pincode", SqlDbType.VarChar).Value = Pincode;
                cmd.Parameters.Add("@City", SqlDbType.VarChar).Value = City;
                cmd.Parameters.Add("@State", SqlDbType.VarChar).Value = State;
                cmd.Parameters.Add("@PreferredLanguage", SqlDbType.VarChar).Value = PreferredLanguage;
                cmd.Parameters.Add("@IsAssociatedWithBerger", SqlDbType.VarChar).Value = IsAssociated;
                cmd.Parameters.Add("@Source", SqlDbType.VarChar).Value = Source;
                cmd.Parameters.Add("@Medium", SqlDbType.VarChar).Value = Medium;
                cmd.Parameters.Add("@Campaign", SqlDbType.VarChar, 2000).Value = Campaign;
                cmd.Parameters.Add("@Term", SqlDbType.VarChar).Value = "";
                cmd.Parameters.Add("@Keyword", SqlDbType.VarChar).Value = "";
                cmd.Parameters.Add("@UrlReferrer", SqlDbType.VarChar).Value = PreviousUrl;
                cmd.Parameters.Add("@ErrorMessage", SqlDbType.VarChar, 2000).Direction = ParameterDirection.Output;

                //add any parameters the stored procedure might require
                cnn.Open();
                object o = cmd.ExecuteScalar();
                cnn.Close();
                var result = (int)cmd.Parameters["@ReturnVal"].Value;
                if (result == 1)
                    return Json(new { succeeded = true, message = "Success" });
                else
                    return Json(new { succeeded = false, message = (string)cmd.Parameters["@ErrorMessage"].Value });
            }
            catch (Exception ex)
            {
                return Json(new { succeeded = false, message = ex.Message });
            }
        }

        public class ConsultInputModel
        {
            public string  Name { get; set; }

            public string Email    { get; set; }
            public string Telephone    { get; set; }

            public string Location { get; set; }
            public string Source { get; set; }
            public string Medium { get; set; }
            public string Campaign { get; set; }
            public string Term { get; set; }
            public string Keyword { get; set; }
            public string AcceptedTerms { get; set; }

            public string UrlReferrer { get; set; }

        }
    }
}