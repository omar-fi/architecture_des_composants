import React, { useState, useEffect, type JSX } from "react";
import { useAuth } from "./contexts/AuthContext";
import { cvService, type Cv } from "./services/api";
import { useNavigate } from "react-router-dom";

const DashboardPage = (): JSX.Element => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cvs, setCvs] = useState<Cv[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchCvs();
  }, [isAuthenticated, user]);

  const fetchCvs = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userCvs = await cvService.getUserCvs(user.id);
      setCvs(userCvs);
    } catch (err: any) {
      console.error("Error fetching CVs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Veuillez sélectionner un fichier PDF");
        return;
      }
      setFile(selectedFile);
      setError("");
      setSuccess("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !user) {
      setError("Veuillez sélectionner un fichier");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      await cvService.uploadCv(user.id, file);
      setSuccess("CV téléchargé avec succès ! L'analyse est en cours...");
      setFile(null);
      // Réinitialiser l'input file
      const fileInput = document.getElementById("cv-file") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      // Rafraîchir la liste des CVs
      await fetchCvs();
    } catch (err: any) {
      console.error("Erreur upload CV:", err);
      let errorMessage = "Erreur lors du téléchargement du CV";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Bienvenue, {user.fullName} !
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Déposer mon CV
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label
                htmlFor="cv-file"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sélectionner un fichier PDF
              </label>
              <input
                id="cv-file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Fichier sélectionné : {file.name}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || uploading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? "Téléchargement en cours..." : "Télécharger et analyser"}
            </button>
          </form>
        </div>

        {/* CVs List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mes CVs ({cvs.length})
          </h2>

          {loading ? (
            <p className="text-gray-600">Chargement...</p>
          ) : cvs.length === 0 ? (
            <p className="text-gray-600">Aucun CV téléchargé pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {cv.fileName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Téléchargé le :{" "}
                        {new Date(cv.uploadDate).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Analysé
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

