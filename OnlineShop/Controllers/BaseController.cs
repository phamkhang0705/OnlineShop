using System.Web.Mvc;

namespace OnlineShop.Controllers
{
    public class BaseController : Controller
    {
        ////initilizing culture on controller initialization
        //protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        //{
        //    base.Initialize(requestContext);
        //    if (Session[CommonConstants.CULTURE_SESSION] != null)
        //    {
        //        Thread.CurrentThread.CurrentCulture = new CultureInfo(CommonConstants.CULTURE_SESSION.ToString());
        //        Thread.CurrentThread.CurrentUICulture = new CultureInfo(CommonConstants.CULTURE_SESSION.ToString());
        //    }
        //}
        //// changing culture
        //public ActionResult ChangeCulture(string currentCulture, string returnUrl)
        //{
        //    Thread.CurrentThread.CurrentCulture = new CultureInfo(currentCulture);
        //    Thread.CurrentThread.CurrentUICulture = new CultureInfo(currentCulture);

        //    Session[CommonConstants.CULTURE_SESSION] = currentCulture;
        //    return Redirect(returnUrl);
        //}
    }
}