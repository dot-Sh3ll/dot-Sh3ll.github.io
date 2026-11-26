"""Langues des applis : un seul endroit à compléter pour en ajouter une.

Chaque appli est un dossier : index.html = français, <code>.html = les autres langues (en.html, de.html…).
lang.py et chrome.py lisent ce fichier ; ils déduisent les langues d'une appli des fichiers présents.
"""
import os

# ordre d'affichage dans le bouton de langue
ORDER = ["fr", "en", "de"]

# textes de l'en-tête, dans la langue de la page affichée
LABELS = {
    "fr": {"home": "Retour à l'accueil des aides de jeu", "kofi": "Offrir un café", "switch": "Passer en français", "soon": "Version française bientôt"},
    "en": {"home": "Back to the game aids home page", "kofi": "Buy me a coffee", "switch": "Switch to English", "soon": "English version coming soon"},
    "de": {"home": "Zurück zur Startseite der Spielhilfen", "kofi": "Spendieren Sie mir einen Kaffee", "switch": "Auf Deutsch wechseln", "soon": "Deutsche Version folgt"},
}

# langue de repli quand la langue du visiteur n'a pas de page dans l'appli
FALLBACK = "en"


def page_file(code):
    """nom du fichier d'une langue dans le dossier d'une appli"""
    return "index.html" if code == "fr" else f"{code}.html"


def page_href(code):
    """lien relatif vers la page d'une langue, depuis une page du même dossier"""
    return "./" if code == "fr" else f"{code}.html"


def available(folder):
    """langues dont la page existe dans le dossier de l'appli, dans l'ordre ORDER"""
    return [c for c in ORDER if os.path.exists(f := os.path.join(folder or ".", page_file(c))) and not _redirige(f)]


def _redirige(f):
    """ancienne page de langue gardée pour les liens, qui renvoie ailleurs (ex. aeons-end/de.html)"""
    try:
        return 'http-equiv="refresh"' in open(f, encoding="utf-8").read(4000)
    except OSError:
        return False


def code_of(path):
    """langue d'une page d'après son nom de fichier (index.html = fr)"""
    b = os.path.basename(path)
    return "fr" if b == "index.html" else b[:-5]
