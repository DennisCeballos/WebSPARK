import { collection, getDocs, onSnapshot, Timestamp } from 'firebase/firestore';
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
      id: '1',
      emoji: '✖️',
      nombre: 'Sistema de Gestión Académica',
      tituloClickbait: '¡Revoluciona la gestión académica con esta plataforma!',
      tecnologias: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
      enlaceInscripcion: 'https://forms.gle/ejemplo1',
      teamSize: 5,
      duration: '4 meses',
      status: 'recruiting'
    },
    {
      id: '2',
      emoji: '✖️',
      nombre: 'App de Sostenibilidad Campus',
      tituloClickbait: '¡Salva el planeta desde tu campus con esta app!',
      tecnologias: ['React Native', 'Firebase', 'Python'],
      enlaceInscripcion: 'https://forms.gle/ejemplo2',
      teamSize: 4,
      duration: '3 meses',
      status: 'active'
    },
    {
      id: '3',
      emoji: '✖️',
      nombre: 'Portal de Empleo Universitario',
      tituloClickbait: '¡Encuentra tu trabajo soñado con esta plataforma!',
      tecnologias: ['Vue.js', 'Django', 'PostgreSQL'],
      enlaceInscripcion: 'https://forms.gle/ejemplo3',
      teamSize: 6,
      duration: '5 meses',
      status: 'completed'
    },
    {
      id: '4',
      emoji: '✖️',
      nombre: 'Sistema de Biblioteca Digital',
      tituloClickbait: '¡La biblioteca del futuro está aquí!',
      tecnologias: ['Angular', 'Spring Boot', 'MySQL'],
      enlaceInscripcion: 'https://forms.gle/ejemplo4',
      teamSize: 4,
      duration: '3 meses',
      status: 'recruiting'
    },
    {
      id: '5',
      emoji: '✖️',
      nombre: 'App de Carpooling Estudiantil',
      tituloClickbait: '¡Comparte viajes y ahorra dinero con otros estudiantes!',
      tecnologias: ['Flutter', 'Node.js', 'MongoDB'],
      enlaceInscripcion: 'https://forms.gle/ejemplo5',
      teamSize: 5,
      duration: '4 meses',
      status: 'active'
    },
    {
      id: '6',
      emoji: '✖️',
      nombre: 'Plataforma de Tutorías',
      tituloClickbait: '¡Conecta con tutores expertos y mejora tus notas!',
      tecnologias: ['React', 'Express', 'PostgreSQL'],
      enlaceInscripcion: 'https://forms.gle/ejemplo6',
      teamSize: 3,
      duration: '2 meses',
      status: 'recruiting'
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
      const querySnapshot = await getDocs(collection(db, 'proyectos'));
      const firebaseProjects: Project[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        firebaseProjects.push({
          id: doc.id,
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
              id: doc.id,
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