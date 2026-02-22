import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Project } from '../types/Project';

// Cache management
interface ProjectCache {
  projects: Project[];
  lastUpdated: number;
  isLoading: boolean;
}

class ProjectService {
  private cache: ProjectCache = {
    projects: [],
    lastUpdated: 0,
    isLoading: false
  };

  private listeners: ((projects: Project[]) => void)[] = [];
  private unsubscribe: (() => void) | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Hardcoded projects for fallback
  private readonly hardcodedProjects: Project[] = [
    {
      nombre: "Proyecto ControlXGestos",
      emoji: "✌️",
      nroOrden: 5,
      complejidad: "4.5/5",
      tituloClickbait: "Programa para controlar tu computadora usando la cámara y gestos de tus manos ",
      tecnologias: ["OpenCV", "Python", "IA"],
      origen: "IniciativaSpark",
      enlaceInscripcion: "https://forms.office.com/Pages/ResponsePage.aspx?id=C7UJMpu33EOfxI1CxAbdYXviU2CVXtNKpQgpf6kSlDJUQkdMWlM5Qjg3UDRENkFYVjNVRTVKU1ZURy4u",
      motivacion: "Hay **DEMASIADAS publicaciones** en Redes Sociales (especialmente Linkedln) mostrando aplicaciones de software donde **se utiliza la cámara** para **capturar gestos o posturas** y aplicarlo de alguna forma ingeniosa en cualquier situación. A este punto, debe ser que esta tecnología realmente está al alcance de cualquiera, y lo único que falta es tener una buena idea y la iniciativa de programarlo.\n\nLa primera parte será aprender cómo programar los gestos y **relacionarlos con comandos específicos**. Luego, tocará ponerse creativo e intentar integrarlo en diferentes aplicaciones dentro del dispositivo.\n\nVideo de Ejemplo: https://www.linkedin.com/posts/dileep-venkata-phaneendra-marrapu-8b1a62327_opencv-mediapipe-gesturerecognition-activity-7364294230061502464-4GLz?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD3qdxcBwfXGxD4VyL2NSVwU1JUBMDKXino",
      objetivos: [
        "Desarrollar un programa en Python que tenga acceso a la cámara de una computadora y utilice OpenCV para el manejo de imágenes.",
        "Aprender sobre modelos de inteligencia artificial para reconocer gestos manuales.",
        "Crear una interfaz para acceder a funciones básicas del sistema mediante gestos.",
        "Crear una interfaz amigable y accesible para que cualquier persona pueda probarlo."
      ],
      descripcion: "El proyecto se basa en una idea simple: “Poder utilizar los gestos en la mano para controlar la computadora”, por lo cuál parte del reto se basa en ponerse creativo con esta idea y encontrar una manera de utilizar la computadora de manera cómoda y sencilla.\n\nEl software en sí consistirá de una interfaz principal para iniciar el programa y manejar configuraciones de calibración. Luego, una vez iniciar el programa, una nueva interfaz se abrirá (más amigable al control por gestos); y luego, la principal ejecución será:\n\n1. Acceder a la cámara y capturar las imágenes.\n2. Dentro de la imagen, detectar y reconocer movimientos específicos de las manos.\n3. Traducir esos gestos en comandos que el ordenador pueda entender.\n\nComo punto clave, la interfaz debe ser sencilla e intuitiva, diseñada para que cualquier usuario ajeno a computación se sienta cómo de aprender mientras que interactúa.",
      conceptosAprender: ["Programación en Python", "Reconocimiento de Gestos con IA", "Procesamiento de imagenes con OpenCV", "Interfaz GUI con TkInter"],
      imagenes: [
        "https://www.mdpi.com/electronics/electronics-14-00734/article_deploy/html/images/electronics-14-00734-g005.png",
        "https://how2electronics.com/wp-content/uploads/2020/01/Gesture-Recognition-and-Its-Application-in-Machine-Learning.jpg"
      ]
    },
    {
      nombre: "Proyecto Dashboard Dinamico",
      emoji: "📊",
      nroOrden: 0,
      complejidad: "2.5/5",
      tituloClickbait: "Web para mostrar un dashboard que se actualice a tiempo real",
      tecnologias: ["Pandas", "Python", "Data Analisis", "Web"],
      origen: "IniciativaSpark",
      enlaceInscripcion: "https://forms.office.com/Pages/ResponsePage.aspx?id=C7UJMpu33EOfxI1CxAbdYXviU2CVXtNKpQgpf6kSlDJUQkdMWlM5Qjg3UDRENkFYVjNVRTVKU1ZURy4u&r2cfd09ac7dd34753b76939d2d2413a0b=%22Proyecto%20Dashboard%20Dinamico%22",
      motivacion: "La idea de **DashboardDinamico** nace de la curiosidad de aprender sobre **Data Analysis en Python** y llevarlo un paso más allá, conectándolo con una experiencia visual y práctica que cualquier persona o empresa pueda usar. No se trata solo de mostrar gráficos: se trata de explotar al máximo el uso de gráficos para mostrar información, con animaciones y detalles que hagan del análisis algo atractivo e intuitivo",
      objetivos: [
        "Diseñar un dashboard interactivo que se actualice en tiempo real conforme cambien los datos.",
        "Construir un formulario de entrada de datos conectado a la fuente, permitiendo que el usuario modifique o agregue información fácilmente.",
        "Practicar y aplicar procesamiento de datos con Pandas, integrando transformaciones básicas para enriquecer las visualizaciones.",
        "(opt) Implementar gráficas dinámicas y atractivas que reaccionen con animaciones al recibir nueva información."
      ],
      descripcion: "Se trata de diseñar una aplicación web que cuenta con dos ventanas principales. Primero, **un formulario de entrada**: donde los usuarios podrán registrar información (supongamos información demográfica como edad, fecha de nacimiento, ocupación, preferencias, etc). Cada envío actualiza la fuente de datos de inmediato.\n\n Segundo, existirá un dashboard dinámico: una interfaz visual donde estén agrupados una serie de gráficas que presente la información demográfica que está en la fuente de datos. Esta ventana estará diseñada para actualizarse constantemente, de modo que cada cambio en la base de datos se refleja instantáneamente en los diagramas.\n\n De esta forma, el flujo completo será:\n\n - Se inicia el dashboard y el formulario en ventanas diferentes\n - Un usuario llena el formulario\n - Los datos son insertados en la fuente de datos\n - La ventana de dashboard se recarga con la información actualizada.\n\n El resultado será una herramienta clara, útil y atractiva, que permite explorar y entender datos de manera inmediata, sin necesidad de recargar páginas o esperar procesos largos.",
      conceptosAprender: ["Desarrollo Web en Python", "Procesamiento de datos con Pandas", "Interfaz web con Streamlit"],
      imagenes: [
        "https://thumbs.dreamstime.com/b/kpi-analytics-dashboard-graphs-kpi-analytics-dashboard-graphs-screen-212689830.jpg",
        "https://dataflip.co/cdn/shop/files/Out-of-StockReportDashboard_1080x.jpg?v=1746551610"
      ]
    },
    {
      nombre: "Proyecto Gestion Eventos",
      emoji: "🎟️",
      nroOrden: 5,
      complejidad: "3.5/5",
      tituloClickbait: "Despliega una web en la nube para que tus eventos tengan una alcance mundial",
      tecnologias: ["Deploy", "Web", "BD", "React"],
      origen: "IniciativaSpark",
      enlaceInscripcion: "https://forms.office.com/Pages/ResponsePage.aspx?id=C7UJMpu33EOfxI1CxAbdYXviU2CVXtNKpQgpf6kSlDJUQkdMWlM5Qjg3UDRENkFYVjNVRTVKU1ZURy4u",
      motivacion: "De las cosas más habituales de la vida, querer ir al cine: entras a la web, revisas la cartelera, revisas los espacios disponibles, reservas. Parece algo “simple” y rutinario… pero, ¿realmente es tan sencillo? Si es tan sencillo ¿**por qué no podría yo mismo publicar** mis propios eventos en una web accesible desde cualquier lugar?\n\nEste proyecto surge de aquella curiosidad: aprender **qué implica desplegar una web dinámica conectada a una base de datos en la nube**. ****La temática de “Gestionar Eventos” es solo una excusa graciosa para ponerle título al desafío pero, honestamente, el principal objetivo va de comprender cómo se publica contenido en internet; y con ello, cómo habilitar una sección administrativa para gestionar los datos de manera sencilla.\n\nEste proyecto es para aquellos que quieren conocer **los desafíos de publicar datos en la web**, preparar una base de datos de acceso global (en la nube) y finalmente entender el proceso de desplegar una web para que sea accesible por cualquiera en el mundo.",
      objetivos: [
        "Desarrollar una aplicación web interactiva que consuma datos desde una base de datos en la nube.",
        "Implementar un sistema de gestión de eventos con autenticación de administrador para modificar datos principales.",
        "Implementar una base de datos pública para gestionar diferentes datos principales de eventos.s",
        "Aprender el proceso de despliegue de aplicaciones web en plataformas modernas de hosting."
      ],
      descripcion: "La idea de proyecto consiste en desplegar una plataforma web de eventos, donde:\n\n1. Los usuarios puedan **visualizar** los eventos disponibles.\n2. Los datos se consuman en **tiempo real** desde una base de datos en la nube.\n3. Cada evento tenga un **enlace único y compartible** para su consulta.\n4. Exista una sección de **administrador** con autenticación para modificar la información esencial (horario, detalles, aforo).\n\nEl enfoque seguirá una estructura sencillo y funcional, ideal para quienes desean aprender y aplicar tecnologías modernas como Google FireBase, MongoDB y páginas de Hosting gratuito como Netlify o DataBricks.",
      conceptosAprender: ["Desarollo Web", "Diseno BD", "Despliegue de Apps Web", "Mantenimiento de Apps Web"],
      imagenes: [
        "https://images.unsplash.com/photo-1560523160-c4ef2f0c61a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1712971404080-87271ce2e473?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ]
    }
  ];

  // Subscribe to project updates
  subscribe(callback: (projects: Project[]) => void) {
    this.listeners.push(callback);

    // Immediately call with cached data if available
    if (this.cache.projects.length > 0) {
      callback(this.cache.projects);
    }

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notify all subscribers
  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.cache.projects));
  }

  // Check if cache is valid
  private isCacheValid(): boolean {
    const now = Date.now();
    return (
      this.cache.projects.length > 0 &&
      (now - this.cache.lastUpdated) < this.CACHE_DURATION
    );
  }

  // Get projects from cache or fetch if needed
  async getProjects(forceRefresh = false): Promise<Project[]> {
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && this.isCacheValid()) {
      console.log('Returning cached projects');
      return this.cache.projects;
    }

    // If already loading, wait for it to complete
    if (this.cache.isLoading) {
      return new Promise((resolve) => {
        const checkLoading = () => {
          if (!this.cache.isLoading) {
            resolve(this.cache.projects);
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
    }

    return this.fetchProjects();
  }

  // Fetch projects from Firebase
  private async fetchProjects(): Promise<Project[]> {
    this.cache.isLoading = true;

    try {
      console.log('Fetching projects from Firebase...');
      const proyectosQuery = query(
        collection(db, 'proyectos'),
        orderBy('nroOrden', 'asc')
      );

      const querySnapshot = await getDocs(proyectosQuery);
      const firebaseProjects: Project[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        firebaseProjects.push({
          nroOrden: data.nroOrden,
          emoji: data.emoji || '',
          nombre: data.nombre || '',
          tituloClickbait: data.tituloClickbait || '',
          tecnologias: data.tecnologias || [],
          enlaceInscripcion: data.enlaceInscripcion || '',
          origen: data.origen,
          motivacion: data.motivacion,
          objetivos: data.objetivos,
          descripcion: data.descripcion,
          conceptosAprender: data.conceptosAprender,
          imagenes: data.imagenes,
          ultimaActualizacion: data.ultimaActualizacion,
        });
      });

      // Update cache
      this.cache.projects = firebaseProjects;
      this.cache.lastUpdated = Date.now();
      this.cache.isLoading = false;

      console.log(`Fetched ${firebaseProjects.length} projects from Firebase`);
      this.notifyListeners();

      return firebaseProjects;
    } catch (error) {
      console.error('Error fetching projects from Firebase:', error);

      // Fallback to hardcoded projects
      this.cache.projects = this.hardcodedProjects;
      this.cache.lastUpdated = Date.now();
      this.cache.isLoading = false;

      console.log('Using hardcoded projects as fallback');
      this.notifyListeners();

      return this.hardcodedProjects;
    }
  }

  // Initialize real-time listener (optional, for live updates)
  initializeRealtimeListener() {
    if (this.unsubscribe) {
      console.log('Real-time listener already active');
      return;
    }

    try {
      this.unsubscribe = onSnapshot(
        collection(db, 'proyectos'),
        (snapshot) => {
          console.log('Real-time update received');
          const projects: Project[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            projects.push({
              nroOrden: data.nroOrden,
              emoji: data.emoji || '',
              nombre: data.nombre || '',
              tituloClickbait: data.tituloClickbait || '',
              tecnologias: data.tecnologias || [],
              enlaceInscripcion: data.enlaceInscripcion || '',
              origen: data.origen,
              motivacion: data.motivacion,
              objetivos: data.objetivos,
              descripcion: data.descripcion,
              conceptosAprender: data.conceptosAprender,
              imagenes: data.imagenes,
              ultimaActualizacion: data.ultimaActualizacion,
            });
          });

          // Update cache with real-time data
          this.cache.projects = projects;
          this.cache.lastUpdated = Date.now();
          this.notifyListeners();
        },
        (error) => {
          console.error('Real-time listener error:', error);
          // Continue with cached data
        }
      );
    } catch (error) {
      console.error('Failed to initialize real-time listener:', error);
    }
  }

  // Stop real-time listener
  stopRealtimeListener() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      console.log('Real-time listener stopped');
    }
  }

  // Get hardcoded projects (for debugging)
  getHardcodedProjects(): Project[] {
    return this.hardcodedProjects;
  }

  // Clear cache (for debugging)
  clearCache() {
    this.cache = {
      projects: [],
      lastUpdated: 0,
      isLoading: false
    };
    console.log('Project cache cleared');
  }

  // Get cache info (for debugging)
  getCacheInfo() {
    return {
      projectCount: this.cache.projects.length,
      lastUpdated: new Date(this.cache.lastUpdated).toLocaleString(),
      isLoading: this.cache.isLoading,
      cacheAge: Date.now() - this.cache.lastUpdated,
      isValid: this.isCacheValid()
    };
  }
}

// Export singleton instance
export const projectService = new ProjectService();