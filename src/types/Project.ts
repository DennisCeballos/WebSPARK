export interface Project {
  id: string;
  nombre: string;
  complejidad?: string;
  tituloClickbait: string;
  tecnologias: string[];
  origen?: string;
  enlaceInscripcion: string;
  motivacion?: string;
  objetivos?: string[];
  descripcion?: string;
  conceptosAprender?: string[];
  imagenes?: string[];
  ultimaActualizacion?: string;
  
  // Legacy fields for backward compatibility with hardcoded data
  title?: string;
  description?: string;
  technologies?: string[];
  teamSize?: number;
  duration?: string;
  status?: 'active' | 'recruiting' | 'completed';
}


/*
JSON que se obtiene desde web
{
  "nombre": "",
  "complejidad": "",
  "tituloClickbait": "",
  "tecnologias": "",
  "origen": "",
  "enlaceInscripcion": "",
  "motivacion": "",
  "objetivos": [ "", "", "", "" ],
  "descripcion": "",
  "conceptosAprender": ["", "", ""],
  "imagenes": [ "", "" ]
}
*/