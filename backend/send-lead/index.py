import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту polygrad@yandex.ru"""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    contact = body.get("contact", "").strip()
    message = body.get("message", "").strip()

    if not name or not contact:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": {"error": "Заполните имя и контакт"},
        }

    smtp_host = os.environ["SMTP_HOST"]
    smtp_port = int(os.environ["SMTP_PORT"])
    smtp_user = os.environ["SMTP_USER"]
    smtp_password = os.environ["SMTP_PASSWORD"]
    to_email = "polygrad@yandex.ru"

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0B1120; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #F5C800; margin: 0; font-size: 22px;">Новая заявка с сайта ПОЛИГРАД</h2>
      </div>
      <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #666; width: 140px; vertical-align: top;"><b>Имя / компания:</b></td>
            <td style="padding: 10px 0; color: #111;">{name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; vertical-align: top;"><b>Телефон / email:</b></td>
            <td style="padding: 10px 0; color: #111;">{contact}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #666; vertical-align: top;"><b>Сообщение:</b></td>
            <td style="padding: 10px 0; color: #111;">{message or "—"}</td>
          </tr>
        </table>
      </div>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от {name}"
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg.attach(MIMEText(html, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }