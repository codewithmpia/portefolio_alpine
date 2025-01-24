from flask import render_template, request, make_response, jsonify
from flask.views import MethodView
from email_validator import validate_email, EmailNotValidError
from sqlalchemy.exc import SQLAlchemyError

from .models import db, Project, Contact


class IndexView(MethodView):
    template_name = "index.html"

    def get(self, path=""):
        projects = [
            project.to_dict() 
            for project in Project.query.filter_by(publish=True)
            .order_by(Project.created_at.desc())
        ]
        return render_template(self.template_name, projects=projects)
    
    def post(self, path=""):
        data = request.get_json()

        if not data:
            return make_response(jsonify({"message": "Veuillez renseigner tous les champs."}), 400)

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name:
            return make_response(jsonify({"message": "Le champ nom est requis."}), 400)
        
        if not email:
            return make_response(jsonify({"message": "Le champ email est requis."}), 400)
        
        if not message:
            return make_response(jsonify({"message": "Le champ message est requis."}), 400)
        
        try:
            validate_email(email)

        except EmailNotValidError as e:
            return make_response(jsonify({"message": "Adresse email invalide."}), 400)
        
        try:
            new_contact = Contact(
                name=name,
                email=email,
                message=message
            )
            db.session.add(new_contact)
            db.session.commit()
            return make_response(jsonify({"message": "Message envoyé avec succès."}), 200)
        
        except SQLAlchemyError:
            db.session.rollback()
            return make_response(jsonify({"message": "Une erreur s'est produite lors de l'envoi du message."}), 500)
        
        

