import { ToastContainer, toast } from 'react-toastify';
import { redirect } from 'next/navigation'

// Tipos para configuración de peticiones opcionales
export interface HttpRequestOptions extends Omit<RequestInit, 'body'> {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

class HttpService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  // Método privado central para procesar todas las peticiones
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Obtener token dinámicamente si existe (por ejemplo, en localStorage)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Manejo centralizado de errores de estado HTTP (4xx, 5xx)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error HTTP ${response.status}: ${response.statusText}`;
        
        if (response.status === 401) {
          // Lógica global para sesión expirada / No autorizado
          toast.warn('Sesión expirada o no autorizada.');
          redirect('/login');
        }

        throw new Error(errorMessage);
      }

      // Si la respuesta no contiene cuerpo (ej. HTTP 204 No Content)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error(`[HttpService Error] ${options.method || 'GET'} ${url}:`, error);
      throw error;
    }
  }

  // Construye la URL con Query Parameters opcionales
  private buildQueryString(params?: Record<string, string | number | boolean>): string {
    if (!params) return '';
    const query = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    return query ? `?${query}` : '';
  }

  // --- MÉTODOS PÚBLICOS ---
  public get<T>(endpoint: string, options?: HttpRequestOptions): Promise<T> {
    const queryString = this.buildQueryString(options?.params);
    return this.request<T>(`${endpoint}${queryString}`, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, body: unknown, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public put<T>(endpoint: string, body: unknown, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public delete<T>(endpoint: string, options?: HttpRequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Exportación como instancia única (Singleton)
export const httpService = new HttpService();