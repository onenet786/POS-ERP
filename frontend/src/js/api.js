const API_BASE = '/api';

export class Api {
  static getToken() {
    return localStorage.getItem('onenet_token') || localStorage.getItem('apexerppos_token') || '';
  }

  static setToken(token) {
    localStorage.setItem('onenet_token', token);
    localStorage.setItem('apexerppos_token', token);
  }

  static clearToken() {
    localStorage.removeItem('onenet_token');
    localStorage.removeItem('apexerppos_token');
  }

  static async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(url, { ...options, headers });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `Request failed with status ${res.status}`);
      }
      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  }

  static get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  static post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  static put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  }

  static patch(endpoint, body) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  }

  static delete(endpoint, body) {
    return this.request(endpoint, {
      method: 'DELETE',
      body: body ? JSON.stringify(body) : undefined
    });
  }
}

// Real-time WebSocket connection manager
export class RealtimeClient {
  static ws = null;
  static listeners = new Set();

  static connect() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    try {
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('[Realtime] WebSocket connected to ApexERP stream');
        document.getElementById('ws-status-indicator')?.classList.add('online');
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyListeners(data);
        } catch (e) {
          console.error('[Realtime] Parse error:', e);
        }
      };

      this.ws.onclose = () => {
        document.getElementById('ws-status-indicator')?.classList.remove('online');
        // Reconnect after 3 seconds
        setTimeout(() => this.connect(), 3000);
      };
    } catch (err) {
      console.warn('[Realtime] Could not connect WebSocket:', err.message);
    }
  }

  static subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  static notifyListeners(data) {
    for (const listener of this.listeners) {
      listener(data);
    }
  }
}
