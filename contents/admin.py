from flask_admin.form import FileUploadField
from flask_admin.contrib.sqla import ModelView


from .utils import BASE_DIR


class ProjectAdminView(ModelView):
    form_extra_fields = {
        "image": FileUploadField(
            label="Image",
            base_path=str(BASE_DIR / "assets"),
            relative_path="static/images/projects/"
        )
    }
    column_list = ("title", "created_at", "publish")

    def on_model_change(self, form, model, is_created):
        if is_created:
            model.generate_slug()
        return super().on_model_change(form, model, is_created)
    

class ContactAdminView(ModelView):
    column_list = ("name", "email", "created_at")