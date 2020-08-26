using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Treat_Api.Models;
using MongoDB.Driver;

namespace Treat_Api.Services
{
    public class MailService
    {
        private readonly IMongoCollection<Mail> _mail;

        public MailService(ITreatDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _mail = database.GetCollection<Mail>(settings.MailCollectionName);

        }

        public Boolean sendDeleteEmails(Mail mails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("treatUsInvitation@gmail.com");
            foreach (string items in mails.Email)
            {
                mail.To.Add(items);
            }
            String plainText = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" +
 "<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">" +
 "<head>" +
 "<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->" +
 "<meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\"/>" +
 "<meta content=\"width=device-width\" name=\"viewport\"/>" +
 "<!--[if !mso]><!-->" +
 "<meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"/>" +
 "<!--<![endif]-->" +
 "<title></title>" +
 "<!--[if !mso]><!-->" +
 "<link href=\"https://fonts.googleapis.com/css?family=Bitter\" rel=\"stylesheet\" type=\"text/css\"/>" +
 "<link href=\"https://fonts.googleapis.com/css?family=Ubuntu\" rel=\"stylesheet\" type=\"text/css\"/>" +
 "<link href=\"https://fonts.googleapis.com/css?family=Open+Sans\" rel=\"stylesheet\" type=\"text/css\"/>" +
 "<!--<![endif]-->" +
 "<style type=\"text/css\">" +
 "		body {" +
 "			margin: 0;" +
 "			padding: 0;" +
 "		}" +
 "		table," +
 "		td," +
 "		tr {" +
 "			vertical-align: top;" +
 "			border-collapse: collapse;" +
 "		}" +
 "		* {" +
 "			line-height: inherit;" +
 "		}" +
 "		a[x-apple-data-detectors=true] {" +
 "			color: inherit !important;" +
 "			text-decoration: none !important;" +
 "		}" +
 "	</style>" +
 "<style id=\"media-query\" type=\"text/css\">" +
 "		@media (max-width: 880px) {" +
 "			.block-grid," +
 "			.col {" +
 "				min-width: 320px !important;" +
 "				max-width: 100% !important;" +
 "				display: block !important;" +
 "			}" +
 "			.block-grid {" +
 "				width: 100% !important;" +
 "			}" +
 "			.col {" +
 "				width: 100% !important;" +
 "			}" +
 "			.col>div {" +
 "				margin: 0 auto;" +
 "			}" +
 "			img.fullwidth," +
 "			img.fullwidthOnMobile {" +
 "				max-width: 100% !important;" +
 "			}" +
 "			.no-stack .col {" +
 "				min-width: 0 !important;" +
 "				display: table-cell !important;" +
 "			}" +
 "			.no-stack.two-up .col {" +
 "				width: 50% !important;" +
 "			}" +
 "			.no-stack .col.num4 {" +
 "				width: 33% !important;" +
 "			}" +
 "			.no-stack .col.num8 {" +
 "				width: 66% !important;" +
 "			}" +
 "			.no-stack .col.num4 {" +
 "				width: 33% !important;" +
 "			}" +
 "			.no-stack .col.num3 {" +
 "				width: 25% !important;" +
 "			}" +
 "			.no-stack .col.num6 {" +
 "				width: 50% !important;" +
 "			}" +
 "			.no-stack .col.num9 {" +
 "				width: 75% !important;" +
 "			}" +
 "			.video-block {" +
 "				max-width: none !important;" +
 "			}" +
 "			.mobile_hide {" +
 "				min-height: 0px;" +
 "				max-height: 0px;" +
 "				max-width: 0px;" +
 "				display: none;" +
 "				overflow: hidden;" +
 "				font-size: 0px;" +
 "			}" +
 "			.desktop_hide {" +
 "				display: block !important;" +
 "				max-height: none !important;" +
 "			}" +
 "		}" +
 "	</style>" +
 "</head>" +
 "<body class=\"clean-body\" style=\"margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;\">" +
 "<!--[if IE]><div class=\"ie-browser\"><![endif]-->" +
 "<table bgcolor=\"#FFFFFF\" cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;\" valign=\"top\" width=\"100%\">" +
 "<tbody>" +
 "<tr style=\"vertical-align: top;\" valign=\"top\">" +
 "<td style=\"word-break: break-word; vertical-align: top;\" valign=\"top\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#FFFFFF\"><![endif]-->" +
 "<div style=\"background-color:#f44336;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#f44336;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
 "<!--<![endif]-->" +
 "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
 "<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
 "<div style=\"line-height: 1.2; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #555555; mso-line-height-alt: 14px;\">" +
 "<p style=\"font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 22px; margin: 0;\"><span style=\"font-size: 18px;\"><span style=\"color: #ffffff;\"><strong>" + mails.Subject + "</strong></span><strong> </strong></span></p>" +
 "</div>" +
 "</div>" +
 "<!--[if mso]></td></tr></table><![endif]-->" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<div style=\"background-color:transparent;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
 "<!--<![endif]-->" +
 "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">" +
 "<tbody>" +
 "<tr style=\"vertical-align: top;\" valign=\"top\">" +
 "<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">" +
 "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;\" valign=\"top\" width=\"100%\">" +
 "<tbody>" +
 "<tr style=\"vertical-align: top;\" valign=\"top\">" +
 "<td style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>" +
 "</tr>" +
 "</tbody>" +
 "</table>" +
 "</td>" +
 "</tr>" +
 "</tbody>" +
 "</table>" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<div style=\"background-color:transparent;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;\">" +
 "<!--<![endif]-->" +
 "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
 "<div style=\"color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.8;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
 "<div style=\"line-height: 1.8; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 22px;\">" +
 "<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">On</span></strong></p>" +
 "<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">" + mails.Date + "</span></strong></p>" +
 "<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">@" + mails.Time + "</span></strong></p>" +
 "<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"> </p>" +
 "</div>" +
 "</div>" +
 "<!--[if mso]></td></tr></table><![endif]-->" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<div style=\"background-color:transparent;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 5px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 5px;\">" +
 "<!--<![endif]-->" +
 "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
 "<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
 "<div style=\"line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;\">" +
 "<p style=\"text-align: center; line-height: 1.2; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;\"><span style=\"font-size: 15px;\"><strong>Sorry For The Inconvenience</strong></span></p>" +
 "<p style=\"text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;\"><br/><span style=\"font-size: 14px;\"> </span></p>" +
 "</div>" +
 "</div>" +
 "<!--[if mso]></td></tr></table><![endif]-->" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<div style=\"background-color:transparent;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
 "<!--<![endif]-->" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<div style=\"background-color:transparent;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
 "<!--<![endif]-->" +
 "<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">" +
 "<tbody>" +
 "<tr style=\"vertical-align: top;\" valign=\"top\">" +
 "<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">" +
 "<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;\" valign=\"top\" width=\"100%\">" +
 "<tbody>" +
 "<tr style=\"vertical-align: top;\" valign=\"top\">" +
 "<td style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>" +
 "</tr>" +
 "</tbody>" +
 "</table>" +
 "</td>" +
 "</tr>" +
 "</tbody>" +
 "</table>" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<div style=\"background-color:transparent;\">" +
 "<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
 "<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
 "<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
 "<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
 "<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
 "<div style=\"width:100% !important;\">" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
 "<!--<![endif]-->" +
 "<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
 "<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
 "<div style=\"line-height: 1.5; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;\">" +
 "<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\"><span style=\"color: #000000;\"><strong><em>For further enquiries</em></strong></span></p>" +
 "<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\">Manisha:0712458755</p>" +
 "<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\">Kalidu: 0712547885</p>" +
 "</div>" +
 "</div>" +
 "<!--[if mso]></td></tr></table><![endif]-->" +
 "<!--[if (!mso)&(!IE)]><!-->" +
 "</div>" +
 "<!--<![endif]-->" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
 "</div>" +
 "</div>" +
 "</div>" +
 "<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
 "</td>" +
 "</tr>" +
 "</tbody>" +
 "</table>" +
 "<!--[if (IE)]></div><![endif]-->" +
 "</body>" +
 "</html>";


            mail.Subject = mails.Subject;
            mail.Body = plainText;
            mail.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);

            NetworkCredential Credentials = new NetworkCredential("treatUsInvitation@gmail.com", "treatus123");

            smtp.Credentials = Credentials;
            smtp.EnableSsl = true;
            smtp.Send(mail);


            return true;

        }

        public Boolean sendProviderEmail(ProviderEmail providerMails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("treatUsInvitation@gmail.com");
            foreach (string items in providerMails.Email)
            {
                mail.To.Add(items);
            }
            String plainText = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" +
"<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">" +
"<head>" +
"<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->" +
"<meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\"/>" +
"<meta content=\"width=device-width\" name=\"viewport\"/>" +
"<!--[if !mso]><!-->" +
"<meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"/>" +
"<!--<![endif]-->" +
"<title></title>" +
"<!--[if !mso]><!-->" +
"<link href=\"https://fonts.googleapis.com/css?family=Bitter\" rel=\"stylesheet\" type=\"text/css\"/>" +
"<link href=\"https://fonts.googleapis.com/css?family=Ubuntu\" rel=\"stylesheet\" type=\"text/css\"/>" +
"<link href=\"https://fonts.googleapis.com/css?family=Open+Sans\" rel=\"stylesheet\" type=\"text/css\"/>" +
"<!--<![endif]-->" +
"<style type=\"text/css\">" +
"		body {" +
"			margin: 0;" +
"			padding: 0;" +
"		}" +
"		table," +
"		td," +
"		tr {" +
"			vertical-align: top;" +
"			border-collapse: collapse;" +
"		}" +
"		* {" +
"			line-height: inherit;" +
"		}" +
"		a[x-apple-data-detectors=true] {" +
"			color: inherit !important;" +
"			text-decoration: none !important;" +
"		}" +
"	</style>" +
"<style id=\"media-query\" type=\"text/css\">" +
"		@media (max-width: 880px) {" +
"			.block-grid," +
"			.col {" +
"				min-width: 320px !important;" +
"				max-width: 100% !important;" +
"				display: block !important;" +
"			}" +
"			.block-grid {" +
"				width: 100% !important;" +
"			}" +
"			.col {" +
"				width: 100% !important;" +
"			}" +
"			.col>div {" +
"				margin: 0 auto;" +
"			}" +
"			img.fullwidth," +
"			img.fullwidthOnMobile {" +
"				max-width: 100% !important;" +
"			}" +
"			.no-stack .col {" +
"				min-width: 0 !important;" +
"				display: table-cell !important;" +
"			}" +
"			.no-stack.two-up .col {" +
"				width: 50% !important;" +
"			}" +
"			.no-stack .col.num4 {" +
"				width: 33% !important;" +
"			}" +
"			.no-stack .col.num8 {" +
"				width: 66% !important;" +
"			}" +
"			.no-stack .col.num4 {" +
"				width: 33% !important;" +
"			}" +
"			.no-stack .col.num3 {" +
"				width: 25% !important;" +
"			}" +
"			.no-stack .col.num6 {" +
"				width: 50% !important;" +
"			}" +
"			.no-stack .col.num9 {" +
"				width: 75% !important;" +
"			}" +
"			.video-block {" +
"				max-width: none !important;" +
"			}" +
"			.mobile_hide {" +
"				min-height: 0px;" +
"				max-height: 0px;" +
"				max-width: 0px;" +
"				display: none;" +
"				overflow: hidden;" +
"				font-size: 0px;" +
"			}" +
"			.desktop_hide {" +
"				display: block !important;" +
"				max-height: none !important;" +
"			}" +
"		}" +
"	</style>" +
"</head>" +
"<body class=\"clean-body\" style=\"margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;\">" +
"<!--[if IE]><div class=\"ie-browser\"><![endif]-->" +
"<table bgcolor=\"#FFFFFF\" cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td style=\"word-break: break-word; vertical-align: top;\" valign=\"top\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#FFFFFF\"><![endif]-->" +
"<div style=\"background-color:#f44336;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#f44336;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.2; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #555555; mso-line-height-alt: 14px;\">" +
"<p style=\"font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 22px; margin: 0;\"><span style=\"font-size: 18px;\"><span style=\"color: #ffffff;\"><strong>" + providerMails.Subject + "</strong></span><strong> </strong></span></p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">" +
"<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"</td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.8;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.8; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 22px;\">" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">On</span></strong></p>" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">" + providerMails.Date + "</span></strong></p>" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">@" + providerMails.Time + "</span></strong></p>" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"> </p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 5px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 5px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;\">" +
"<p style=\"text-align: center; line-height: 1.2; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;\"><span style=\"font-size: 15px;\"><strong>PROVIDER CONFIRMATION</strong></span></p>" +
"<p style=\"text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;\"><br/><span style=\"font-size: 14px;\">Please Go To Following Link To Confirm Your Participation </span></p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<div align=\"center\" class=\"button-container\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\"><tr><td style=\"padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"\" style=\"height:31.5pt; width:129pt; v-text-anchor:middle;\" arcsize=\"10%\" stroke=\"false\" fillcolor=\"#f44336\"><w:anchorlock/><v:textbox inset=\"0,0,0,0\"><center style=\"color:#ffffff; font-family:Arial, sans-serif; font-size:16px\"><![endif]-->" +
"<div style=\"text-decoration:none;display:inline-block;color:#ffffff;background-color:#f44336;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #f44336;border-right:1px solid #f44336;border-bottom:1px solid #f44336;border-left:1px solid #f44336;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;\"><span style=\"padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;\"><a href=" + providerMails.ProviderUrl + " style=\" color:#ffffff \" target=\"_blank\"><span style=\"padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;\"><span style=\"font-size: 16px; line-height: 2; mso-line-height-alt: 32px;\">CONFIRMATION</span></span></a><span style=\"font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;\"></a></span></span></div>" +
"<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->" +
"</div>" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">" +
"<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"</td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.5; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;\">" +
"<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\"><span style=\"color: #000000;\"><strong><em>For further enquiries</em></strong></span></p>" +
"<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\">Manisha:0712458755</p>" +
"<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\">Kalidu: 0712547885</p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"</td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"<!--[if (IE)]></div><![endif]-->" +
"</body>" +
"</html>";


            mail.Subject = providerMails.Subject;
            mail.Body = plainText;
            mail.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);

            NetworkCredential Credentials = new NetworkCredential("treatUsInvitation@gmail.com", "treatus123");

            smtp.Credentials = Credentials;
            smtp.EnableSsl = true;
            smtp.Send(mail);


            return true;


        }

        public Boolean sendEmail(Mail mails)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress("treatUsInvitation@gmail.com");
           
            foreach (string items in mails.Email)
            {
                mail.To.Add(items);
            }
            String plainText = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional //EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" +
"<html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:v=\"urn:schemas-microsoft-com:vml\">" +
"<head>" +
"<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->" +
"<meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-Type\"/>" +
"<meta content=\"width=device-width\" name=\"viewport\"/>" +
"<!--[if !mso]><!-->" +
"<meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"/>" +
"<!--<![endif]-->" +
"<title></title>" +
"<!--[if !mso]><!-->" +
"<link href=\"https://fonts.googleapis.com/css?family=Bitter\" rel=\"stylesheet\" type=\"text/css\"/>" +
"<link href=\"https://fonts.googleapis.com/css?family=Ubuntu\" rel=\"stylesheet\" type=\"text/css\"/>" +
"<link href=\"https://fonts.googleapis.com/css?family=Open+Sans\" rel=\"stylesheet\" type=\"text/css\"/>" +
"<!--<![endif]-->" +
"<style type=\"text/css\">" +
"		body {" +
"			margin: 0;" +
"			padding: 0;" +
"		}" +
"		table," +
"		td," +
"		tr {" +
"			vertical-align: top;" +
"			border-collapse: collapse;" +
"		}" +
"		* {" +
"			line-height: inherit;" +
"		}" +
"		a[x-apple-data-detectors=true] {" +
"			color: inherit !important;" +
"			text-decoration: none !important;" +
"		}" +
"	</style>" +
"<style id=\"media-query\" type=\"text/css\">" +
"		@media (max-width: 880px) {" +
"			.block-grid," +
"			.col {" +
"				min-width: 320px !important;" +
"				max-width: 100% !important;" +
"				display: block !important;" +
"			}" +
"			.block-grid {" +
"				width: 100% !important;" +
"			}" +
"			.col {" +
"				width: 100% !important;" +
"			}" +
"			.col>div {" +
"				margin: 0 auto;" +
"			}" +
"			img.fullwidth," +
"			img.fullwidthOnMobile {" +
"				max-width: 100% !important;" +
"			}" +
"			.no-stack .col {" +
"				min-width: 0 !important;" +
"				display: table-cell !important;" +
"			}" +
"			.no-stack.two-up .col {" +
"				width: 50% !important;" +
"			}" +
"			.no-stack .col.num4 {" +
"				width: 33% !important;" +
"			}" +
"			.no-stack .col.num8 {" +
"				width: 66% !important;" +
"			}" +
"			.no-stack .col.num4 {" +
"				width: 33% !important;" +
"			}" +
"			.no-stack .col.num3 {" +
"				width: 25% !important;" +
"			}" +
"			.no-stack .col.num6 {" +
"				width: 50% !important;" +
"			}" +
"			.no-stack .col.num9 {" +
"				width: 75% !important;" +
"			}" +
"			.video-block {" +
"				max-width: none !important;" +
"			}" +
"			.mobile_hide {" +
"				min-height: 0px;" +
"				max-height: 0px;" +
"				max-width: 0px;" +
"				display: none;" +
"				overflow: hidden;" +
"				font-size: 0px;" +
"			}" +
"			.desktop_hide {" +
"				display: block !important;" +
"				max-height: none !important;" +
"			}" +
"		}" +
"	</style>" +
"</head>" +
"<body class=\"clean-body\" style=\"margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;\">" +
"<!--[if IE]><div class=\"ie-browser\"><![endif]-->" +
"<table bgcolor=\"#FFFFFF\" cellpadding=\"0\" cellspacing=\"0\" class=\"nl-container\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td style=\"word-break: break-word; vertical-align: top;\" valign=\"top\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td align=\"center\" style=\"background-color:#FFFFFF\"><![endif]-->" +
"<div style=\"background-color:#f44336;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:#f44336;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.2; font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; color: #555555; mso-line-height-alt: 14px;\">" +
"<p style=\"font-size: 18px; line-height: 1.2; word-break: break-word; text-align: center; font-family: inherit; mso-line-height-alt: 22px; margin: 0;\"><span style=\"font-size: 18px;\"><span style=\"color: #ffffff;\"><strong>"+mails.Subject +"</strong></span><strong> </strong></span></p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">" +
"<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"</td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.8;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.8; font-size: 12px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 22px;\">" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">On</span></strong></p>" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">"+mails.Date+"</span></strong></p>" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"><strong><span style=\"font-size: 17px; mso-ansi-font-size: 18px;\">@"+mails.Time+"</span></strong></p>" +
"<p style=\"font-size: 14px; line-height: 1.8; word-break: break-word; text-align: center; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 25px; margin: 0;\"> </p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 5px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 5px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.2; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;\">" +
"<p style=\"text-align: center; line-height: 1.2; word-break: break-word; font-size: 15px; mso-line-height-alt: 18px; margin: 0;\"><span style=\"font-size: 15px;\"><strong>RSVP ESSENTIAL</strong></span></p>" +
"<p style=\"text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;\"><br/><span style=\"font-size: 14px;\">RVSP and submit your cuisine specifications for this treat before "+mails.Date+"</span></p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<div align=\"center\" class=\"button-container\" style=\"padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;\"><tr><td style=\"padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px\" align=\"center\"><v:roundrect xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" href=\"\" style=\"height:31.5pt; width:129pt; v-text-anchor:middle;\" arcsize=\"10%\" stroke=\"false\" fillcolor=\"#f44336\"><w:anchorlock/><v:textbox inset=\"0,0,0,0\"><center style=\"color:#ffffff; font-family:Arial, sans-serif; font-size:16px\"><![endif]-->" +
"<div style=\"text-decoration:none;display:inline-block;color:#ffffff;background-color:#f44336;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto; width:auto;;border-top:1px solid #f44336;border-right:1px solid #f44336;border-bottom:1px solid #f44336;border-left:1px solid #f44336;padding-top:5px;padding-bottom:5px;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;\"><span style=\"padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;\"><a href=" +mails.TreatUrl +" style=\" color:#ffffff \" target=\"_blank\"><span style=\"padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;\"><span style=\"font-size: 16px; line-height: 2; mso-line-height-alt: 32px;\">RSVP HERE</span></span></a><span style=\"font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;\"></a></span></span></div>" +
"<!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->" +
"</div>" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td class=\"divider_inner\" style=\"word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;\" valign=\"top\">" +
"<table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"divider_content\" role=\"presentation\" style=\"table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;\" valign=\"top\" width=\"100%\">" +
"<tbody>" +
"<tr style=\"vertical-align: top;\" valign=\"top\">" +
"<td style=\"word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;\" valign=\"top\"><span></span></td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"</td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<div style=\"background-color:transparent;\">" +
"<div class=\"block-grid\" style=\"Margin: 0 auto; min-width: 320px; max-width: 860px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;\">" +
"<div style=\"border-collapse: collapse;display: table;width: 100%;background-color:transparent;\">" +
"<!--[if (mso)|(IE)]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background-color:transparent;\"><tr><td align=\"center\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:860px\"><tr class=\"layout-full-width\" style=\"background-color:transparent\"><![endif]-->" +
"<!--[if (mso)|(IE)]><td align=\"center\" width=\"860\" style=\";width:860px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;\" valign=\"top\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;\"><![endif]-->" +
"<div class=\"col num12\" style=\"min-width: 320px; max-width: 860px; display: table-cell; vertical-align: top; width: 860px;\">" +
"<div style=\"width:100% !important;\">" +
"<!--[if (!mso)&(!IE)]><!-->" +
"<div style=\"border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;\">" +
"<!--<![endif]-->" +
"<!--[if mso]><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"><tr><td style=\"padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif\"><![endif]-->" +
"<div style=\"color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;\">" +
"<div style=\"line-height: 1.5; font-size: 12px; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 18px;\">" +
"<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\"><span style=\"color: #000000;\"><strong><em>For further enquiries</em></strong></span></p>" +
"<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\">Manisha:0712458755</p>" +
"<p style=\"font-size: 14px; line-height: 1.5; word-break: break-word; text-align: center; mso-line-height-alt: 21px; margin: 0;\">Kalidu: 0712547885</p>" +
"</div>" +
"</div>" +
"<!--[if mso]></td></tr></table><![endif]-->" +
"<!--[if (!mso)&(!IE)]><!-->" +
"</div>" +
"<!--<![endif]-->" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->" +
"</div>" +
"</div>" +
"</div>" +
"<!--[if (mso)|(IE)]></td></tr></table><![endif]-->" +
"</td>" +
"</tr>" +
"</tbody>" +
"</table>" +
"<!--[if (IE)]></div><![endif]-->" +
"</body>" +
"</html>";


            mail.Subject = mails.Subject;
            mail.Body = plainText;
            mail.IsBodyHtml = true;
                      
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);

            NetworkCredential Credentials = new NetworkCredential("treatUsInvitation@gmail.com", "treatus123");

            smtp.Credentials = Credentials;
            smtp.EnableSsl = true;
            smtp.Send(mail);

            return true;
            

        }
    }
}
