import "./src/styles.css";
import { marked } from "marked";
import PineconeRouter from "pinecone-router";
import DOMPurify from "dompurify";
import Alpine from "alpinejs";

window.Alpine = Alpine;
Alpine.plugin(PineconeRouter);
window.PineconeRouter.settings.interceptLinks = false;

Alpine.data("router", () => ({
    projects: projects,

    truncateText(text, length) {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + '...';
    },

    formatMarkdown(markdown) {
        let html = marked(markdown);
        const replacements = {
            '<h1>': '<h1 class="text-3xl font-bold text-cyan-600 py-3 underline">',
            '<h2>': '<h2 class="text-2xl font-bold text-cyan-600 py-3 underline">',
            '<h3>': '<h3 class="text-xl font-bold text-cyan-600 py-3 underline">',
            '<h4>': '<h4 class="text-lg font-bold text-cyan-600 py-3 underline">',
            '<h5>': '<h5 class="text-md font-bold text-cyan-600 py-3 underline">',
            '<h6>': '<h6 class="text-sm font-bold text-cyan-600 py-3 underline">',
            '<ul>': '<ul class="list-disc list-inside pl-4 ml-4 marker:text-cyan-600 rounded-md">',
            '<ol>': '<ol class="list-decimal list-inside pl-4 ml-4 marker:text-orange-400 rounded-md">',
            '<li>': '<li class="my-2.5">',
            '<p>': '<p class="my-3">'
        };

        for (const [key, value] of Object.entries(replacements)) {
            html = html.replace(new RegExp(key, 'g'), value);
        }

        html = `<div class="prose lg:prose-xl">${html}</div>`;
        return DOMPurify.sanitize(html);
    },

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    },

    index() {
        document.title = "Accueil | Codewithmpia";
        return `<div class="w-full flex flex-col gap-3">
            <h1 class="flex items-baseline gap-1 text-4xl font-black text-cyan-600">
                Projects
                <span class="block w-3 h-3 bg-orange-400"></span>
            </h1>
            <p>Voici la liste des projets que j'ai réalisé ou auxquels j'ai participé.</p>
        </div>
        <template x-if="projects.length === 0">
            <div class="relative w-full flex items-center justify-between p-3 rounded border border-solid border-blue-200 bg-blue-50 text-blue-900">
                <strong>Aucun projet n'est disponible.</strong>
            </div>
        </template>

        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <template x-for="project in projects" :key="project.slug">
                <a x-bind:href="'/projets/' + project.slug + '/'" x-link class="relative rounded-md shadow-md group cursor-pointer">
                    <img x-bind:src="project.image" class="h-full w-full object-cover rounded-md" />
                    <div class="absolute inset-x-0 bottom-0 flex items-center justify-center bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-md">
                    <span x-text="truncateText(project.title, 15)" class="text-white text-sm p-2"></span>
                    </div>
                </a>
            </template>
        </div>`;
    },

    getDetail() {
        document.title = this.project.title + " | Codewithmpia";
        return `<div class="w-full flex flex-col gap-3">
            <a href="/" x-link class="flex items-center gap-1 underline hover:text-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 8L2 12L6 16"/>
                    <path d="M2 12H22"/>
                </svg>
                <span>Retour</span>
            </a>
            <h1 class="flex items-baseline gap-1 text-4xl font-black text-cyan-600">
                <span x-text="project.title"></span>
                <span class="block w-3 h-3 bg-orange-400"></span>
            </h1>
            <div class="flex items-center gap-6 text-sm uppercase">
                <span x-text="formatDate(project.created_at)"></span>
                <a x-bind:href="project.link" target="_blank" class="hover:text-cyan-600 underline">Voir sur Github</a>
            </div>
        </div>
        <div class="w-full flex flex-col gap-6">
            <div class="w-full h-72 rounded-md shadow-md">
                <img class="w-full h-72 object-cover rounded-md" x-bind:src="'/' + project.image" x-bind:alt="project.title">
            </div>
            <div x-html="formatMarkdown(project.description)"></div>
            <div class="self-start">
                <a x-bind:href="project.link" target="_blank" class="w-56 md:w-full lg:w-full flex items-center justify-between gap-1 bg-cyan-600 text-white font-medium py-2 px-3 rounded shadow-sm cursor-pointer hover:filter hover:brightness-110">
                    Voir sur Github
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8L22 12L18 16"/>
                        <path d="M2 12H22"/>
                    </svg>
                </a>
            </div>
        </div>`;
    },

    contact() {
        document.title = "Contact | Codewithmpia";
        return `<div class="w-full flex flex-col gap-3">
            <a href="/" x-link class="flex items-center gap-1 underline hover:text-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 8L2 12L6 16"/>
                    <path d="M2 12H22"/>
                </svg>
                <span>Retour</span>
            </a>
            <h1 class="flex items-baseline gap-1 text-4xl font-black text-cyan-600">
                Me contacter
                <span class="block w-3 h-3 bg-orange-400"></span>
            </h1>
            <p>Des questions? Laissez-moi un message et je vous répondrai dans les plus brefs délais.</p>
        </div>
        <div class="w-full">
            <template x-if="$store.messages.isAlertShow">
                <div class="relative w-full flex items-center justify-between p-3 rounded mb-6 border border-solid" :class="{'border-green-200 bg-green-50 text-green-900': $store.messages.alertType === 'success', ' border-red-200 bg-red-50 text-red-900': $store.messages.alertType === 'error'}">
                    <span x-text="$store.messages.alertContent"></span>
                    <svg x-on:click="$store.messages.closeAlert()" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </div>
            </template>
            <form x-on:submit.prevent="submitForm" method="post">
                <div class="w-full mb-3">
                    <label form="name" class="block font-medium uppercase mb-1.5">Votre nom</label>
                    <input x-model="name" type="text" name="name" id="name" class="w-full min-h-12 outline-none border border-solid border-[#d5e3ec] rounded p-3 focus:border-cyan-600 focus:shadow-[0_0_0_3px_#4869ee3f]" required />
                </div>
                <div class="w-full mb-3">
                    <label form="email" class="block font-medium uppercase mb-1.5">Votre adresse email</label>
                    <input x-model="email" type="email" name="email" id="email" class="w-full min-h-12 outline-none border border-solid border-[#d5e3ec] rounded p-3 focus:border-cyan-600 focus:shadow-[0_0_0_3px_#4869ee3f]" required />
                </div>
                <div class="w-full mb-3">
                    <label form="message" class="block font-medium uppercase mb-1.5">Votre message</label>
                    <textarea x-model="message" name="message" id="message" class="w-full min-h-12 h-52 resize-none outline-none border border-solid border-[#d5e3ec] rounded p-3 focus:border-cyan-600 focus:shadow-[0_0_0_3px_#4869ee3f]" required></textarea>
                </div>
                <button type="submit" class="bg-cyan-600 text-white font-medium py-2 px-3 rounded shadow-sm cursor-pointer hover:filter hover:brightness-110">Envoyer</button>
            </form>
        </div>`;
    },

    notfound() {
        document.title = "Page introuvable | Codewithmpia";
        return `<div class="w-full flex flex-col gap-3">
            <a href="/" x-link class="flex items-center gap-1 underline hover:text-cyan-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 8L2 12L6 16"/>
                    <path d="M2 12H22"/>
                </svg>
                <span>Retour</span>
            </a>
            <h1 class="flex items-baseline gap-1 text-4xl font-black text-cyan-600">
                Page introuvable
                <span class="block w-3 h-3 bg-orange-400"></span>
            </h1>
            <p>Pas de paniques, vérifiez l'url puis réessayer.</p>
        </div>
        <div class="w-full">
            <div class="relative w-full flex items-center justify-between p-3 rounded mb-6 border border-solid border-red-200 bg-red-50 text-red-900">
                <strong>La page que recherchez n'existe pas.</strong>
            </div>
            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <template x-for="project in projects.slice(0, 4)" :key="project.slug">
                    <a x-bind:href="'/projets/' + project.slug + '/'" x-link class="relative rounded-md shadow-md group cursor-pointer">
                        <img x-bind:src="'/' + project.image" class="h-full w-full object-cover rounded-md" />
                        <div class="absolute inset-x-0 bottom-0 flex items-center justify-center bg-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-md">
                        <span x-text="truncateText(project.title, 15)" class="text-white text-sm p-2"></span>
                        </div>
                    </a>
                </template>
            </div>
        </div>`;
    },
}));

Alpine.data("project", () => ({
    projects: projects,
    project: null,

    getProject(slug) {
        this.project = this.projects.find((project) => project.slug === slug)
    }
}));

Alpine.store("messages", {
    isAlertShow: false,
    alertContent: "",
    alertType: "",

    showAlert(content, type = "success") {
        this.alertContent = content;
        this.alertType = type;
        this.isAlertShow = true;
    },

    closeAlert() {
        this.isAlertShow = false;
        this.alertContent = "";
        this.alertType = "";
    }
});

Alpine.data("contact", () => ({
    name: "",
    email: "",
    message: "",
    
    resetForm() {
        this.name = "";
        this.email = "";
        this.message = "";
    },

    validateForm() {
        if (this.name === "") {
            Alpine.store("messages").showAlert("Le champ nom est requis.", "error");
            return false;
        }
        if (this.email === "") {
            Alpine.store("messages").showAlert("Le champ email est requis.", "error");
            return false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.email)) {
            Alpine.store("messages").showAlert("L'adresse email n'est pas valide.", "error");
            return false;
        }
        return true;
    },

    async submitForm() {
        if (!this.validateForm()) {
            return;
        }

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: this.name,
                    email: this.email,
                    message: this.message,
                }),
            });
            if (response.ok && response.status === 200) {
                const data = await response.json();
                Alpine.store("messages").showAlert(data.message);
                this.resetForm();
            }
        } catch (error) {
            console.error("Form submission error:", error);
            Alpine.store("messages").showAlert("Une erreur s'est produite lors de l'envoi du formulaire.", "error");
        }
    }
}));

Alpine.start();
