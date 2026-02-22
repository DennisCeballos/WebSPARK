export interface Project {
  nombre: string;
  emoji: string;
  nroOrden: number;
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