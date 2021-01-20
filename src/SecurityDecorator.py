from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from src.server.ProjectAdministration import ProjectAdministration


def secured(function):
    """Decorator zur Google Firebase-basierten Authentifizierung von Benutzern

    Da es sich bei diesem System um eine basale Fallstudie zu Lehrzwecken handelt, wurde hier
    bewusst auf ein ausgefeiltes Berechtigungskonzept verzichtet. Vielmehr soll dieses Decorator
    einen Weg aufzeigen, wie man technisch mit vertretbarem Aufwand in eine Authentifizierung
    einsteigen kann.

    POLICY: Die hier demonstrierte Policy ist, dass jeder, der einen durch Firebase akzeptierten
    Account besitzt, sich an diesem System anmelden kann. Bei jeder Anmeldung werden Klarname,
    Mail-Adresse sowie die Google User ID in unserem System gespeichert bzw. geupdated. Auf diese
    Weise könnte dann für eine Erweiterung des Systems auf jene Daten zurückgegriffen werden.
    """
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Verify Firebase auth.
        id_token = request.cookies.get("token")
        error_message = None
        claims = None
        objects = None

        if id_token:
            try:
                # Verify the token against the Firebase Auth API. This example
                # verifies the token on each page load. For improved performance,
                # some applications may wish to cache results in an encrypted
                # session store (see for instance
                # http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims is not None:
                    adm = ProjectAdministration()

                    google_id = claims.get("google_id")
                    mail = claims.get("mail")
                    firstname = claims.get("firstname")
                    name = claims.get("name")
                    role_id = claims.get("role_id")

                    user = adm.get_user_by_google_id(google_id)
                    if user is not None:
                        """Fall: Der Benutzer ist unserem System bereits bekannt.
                        Wir gehen davon aus, dass die google_id sich nicht ändert.
                        Wohl aber können sich der zugehörige Name (name&firstname),
                        die E-Mail-Adresse (mail) und die Role (role_id) ändern. 
                        Daher werden diese vier Daten sicherheitshalber
                        in unserem System geupdated."""
                        user.set_name(name)
                        user.set_firstname(firstname)
                        user.set_mail(mail)
                        user.set_role_id(role_id)
                        adm.save_user(user)
                    else:
                        """Fall: Der Benutzer war bislang noch nicht eingelogged. 
                        Wir legen daher ein neues User-Objekt an, um dieses ggf. später
                        nutzen zu können.
                        """
                        user = adm.create_user(name, firstname, mail, google_id)

                    print(request.method, request.path, "angefragt durch:", name, firstname, mail, google_id)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED !!!
            except ValueError as exc:
                # This will be raised if the token is expired or any other
                # verification checks fail.
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED !!!

        return '', 401  # UNAUTHORIZED !!!

    return wrapper


