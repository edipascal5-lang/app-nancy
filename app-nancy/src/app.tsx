import React, { useState, useEffect, useMemo } from 'react';
import { 
  Package, 
  Building2, 
  Calendar, 
  Sparkles, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users, 
  Ruler, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Printer, 
  Layers, 
  Palette, 
  Sliders, 
  Grid, 
  Truck, 
  ChevronRight, 
  X, 
  Info,
  Maximize2,
  RefreshCw,
  Share2
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_INVENTORY = [
  {
    id: 'mob-1',
    name: 'Sillón Chesterfield 3 Cuerpos',
    category: 'Mobiliario Living',
    totalStock: 8,
    rentCost: 15000,
    dimensions: '210 x 90 x 80 cm',
    color: 'Suela / Cuero Marrón',
    style: 'Clásico / Vintage',
    description: 'Sillón capitoné de ecocuero ideal para zona VIP o livings de recepción.',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mob-2',
    name: 'Mesa Redonda Banquetera (10p)',
    category: 'Mesas y Sillas',
    totalStock: 35,
    rentCost: 3500,
    dimensions: '180 cm diámetro',
    color: 'Madera natural / Blanco',
    style: 'Elegante / Universal',
    description: 'Mesa plegable reforzada para 10-12 comensales.',
    imageUrl: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mob-3',
    name: 'Silla Tiffany Dorada',
    category: 'Mesas y Sillas',
    totalStock: 320,
    rentCost: 1200,
    dimensions: '40 x 40 x 91 cm',
    color: 'Dorado Glam',
    style: 'Elegante / Glam',
    description: 'Silla clásica de resina reforzada con almohadón blanco mullido.',
    imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mob-4',
    name: 'Cortina Cortinado LED 3x3m',
    category: 'Iluminación y Telones',
    totalStock: 12,
    rentCost: 8500,
    dimensions: '300 x 300 cm',
    color: 'Blanco Cálido',
    style: 'Romántico / Moderno',
    description: 'Guirnalda tupida de microleds cálidos con caída de gasa translúcida.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mob-5',
    name: 'Centro de Mesa Nórdico Botánico',
    category: 'Centros de Mesa',
    totalStock: 40,
    rentCost: 2800,
    dimensions: '25 x 25 x 45 cm',
    color: 'Eucalipto / Dorado / Madera',
    style: 'Boho Chic / Rústico',
    description: 'Estructura geométrica dorada con follaje natural preservado y vela LED interior.',
    imageUrl: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mob-6',
    name: 'Arco de Flores Hexagonal',
    category: 'Estructuras y Alteres',
    totalStock: 3,
    rentCost: 22000,
    dimensions: '240 x 220 cm',
    color: 'Dorado / Flores Rosa Pastel',
    style: 'Romántico / Boho',
    description: 'Arco metálico desmontable ideal para altar de bodas o photocall de 15 años.',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80'
  }
];

const INITIAL_VENUES = [
  {
    id: 'ven-1',
    name: 'Salón Las Acacias',
    maxCapacity: 250,
    totalArea: 380,
    dimensions: '25 x 15 m',
    dancefloorArea: 60,
    ceilingHeight: '4.5 m',
    electricOutlets: '6 tableros monofásicos repartidos + 1 trifásico en escenario',
    restrictions: 'Prohibido clavar en paredes. Humo de escenario permitido con aviso previa.',
    address: 'Av. Las Palmas 4500, Zona Norte',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'ven-2',
    name: 'Quinta Los Olivos (Espacio Cubierto)',
    maxCapacity: 160,
    totalArea: 220,
    dimensions: '20 x 11 m',
    dancefloorArea: 35,
    ceilingHeight: '3.8 m',
    electricOutlets: '4 cajas estancas en perímetro',
    restrictions: 'Música exterior hasta las 02:00 am. No pirotecnia.',
    address: 'Camino del Valle Km 12',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'ven-3',
    name: 'Gran Salón Elegance',
    maxCapacity: 450,
    totalArea: 600,
    dimensions: '30 x 20 m',
    dancefloorArea: 100,
    ceilingHeight: '6.0 m',
    electricOutlets: 'Tableros de alta potencia cada 5 metros y riggings en techo',
    restrictions: 'Montaje exclusivamente en turno mañana.',
    address: 'Centro Cívico Plaza Mayor 120',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf59202c395?auto=format&fit=crop&w=500&q=80'
  }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    eventName: 'Boda Sofía & Mateo',
    clientName: 'Sofía Martínez',
    eventDate: '2026-11-15',
    venueId: 'ven-1',
    guestsCount: 120,
    style: 'Boho Chic / Rústico',
    selectedItems: [
      { itemId: 'mob-2', quantity: 12 },
      { itemId: 'mob-3', quantity: 120 },
      { itemId: 'mob-5', quantity: 12 },
      { itemId: 'mob-6', quantity: 1 },
      { itemId: 'mob-1', quantity: 2 }
    ],
    notes: 'Priorizar luz cálida cerca de la pista. El arco de flores va detrás de la mesa principal.',
    totalEstimate: 236400,
    createdAt: '2026-03-20'
  }
];

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persistent States
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('nancy_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('nancy_venues');
    return saved ? JSON.parse(saved) : INITIAL_VENUES;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('nancy_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('nancy_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('nancy_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('nancy_projects', JSON.stringify(projects));
  }, [projects]);

  // Modals state
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [venueModalOpen, setVenueModalOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState(null);

  const [viewingProject, setViewingProject] = useState(null);

  // Filter & Search states
  const [invSearch, setInvSearch] = useState('');
  const [invCategoryFilter, setInvCategoryFilter] = useState('Todas');

  // Helper Stats
  const totalMobiliarioCount = useMemo(() => {
    return inventory.reduce((acc, curr) => acc + Number(curr.totalStock), 0);
  }, [inventory]);

  // Inventory Categories
  const categories = ['Todas', 'Mesas y Sillas', 'Mobiliario Living', 'Centros de Mesa', 'Iluminación y Telones', 'Estructuras y Alteres', 'Vajilla y Mantelería'];

  // Delete Handlers
  const handleDeleteItem = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este ítem del inventario?')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleDeleteVenue = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este salón del catálogo?')) {
      setVenues(prev => prev.filter(v => v.id !== id));
    }
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('¿Deseas eliminar este proyecto de la lista?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex-shrink-0 border-r border-slate-800 flex flex-col justify-between">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-slate-900 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg tracking-wide text-rose-100">Nancy</h1>
              <p className="text-xs text-rose-300/80 uppercase tracking-wider font-semibold">Ambientaciones</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-rose-500/20 text-rose-300 border-l-4 border-rose-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Grid className="w-5 h-5" />
              Inicio & Resumen
            </button>

            <button
              onClick={() => setActiveTab('planner')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'planner' 
                  ? 'bg-rose-500/20 text-rose-300 border-l-4 border-rose-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              Planificador & Layout 2D
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'inventory' 
                  ? 'bg-rose-500/20 text-rose-300 border-l-4 border-rose-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Package className="w-5 h-5" />
              Inventario de Mobiliario
            </button>

            <button
              onClick={() => setActiveTab('venues')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'venues' 
                  ? 'bg-rose-500/20 text-rose-300 border-l-4 border-rose-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-5 h-5" />
              Catálogo de Salones
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'projects' 
                  ? 'bg-rose-500/20 text-rose-300 border-l-4 border-rose-400 font-semibold' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <FileText className="w-5 h-5" />
              Eventos Guardados ({projects.length})
            </button>
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0 text-slate-400" />
          <span>Datos guardados localmente en tu navegador.</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-rose-900 via-purple-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <span className="px-3 py-1 bg-rose-500/30 text-rose-200 text-xs font-semibold rounded-full uppercase tracking-wider">
                  ¡Hola Nancy! Bienvenida a tu taller digital
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold">Panel General de Gestión</h2>
                <p className="text-slate-300 text-sm max-w-xl">
                  Calcula distribuciones de salones, gestiona tu stock físico sin sobrealquileres y arma presupuestos listos para tus eventos.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('planner')}
                className="relative z-10 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Diseñar Nuevo Evento
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-rose-100 text-rose-600 rounded-xl">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Variedad de Productos</p>
                  <p className="text-2xl font-bold text-slate-800">{inventory.length}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-amber-100 text-amber-700 rounded-xl">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Unidades en Stock</p>
                  <p className="text-2xl font-bold text-slate-800">{totalMobiliarioCount}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-sky-100 text-sky-700 rounded-xl">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Salones en Catálogo</p>
                  <p className="text-2xl font-bold text-slate-800">{venues.length}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="p-3.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Eventos Guardados</p>
                  <p className="text-2xl font-bold text-slate-800">{projects.length}</p>
                </div>
              </div>
            </div>

            {/* Recent Events & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Event List */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-800">Próximos Eventos Planificados</h3>
                    <p className="text-xs text-slate-500">Últimos proyectos armados en la plataforma</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('projects')} 
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
                    <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Aún no hay eventos guardados.</p>
                    <button
                      onClick={() => setActiveTab('planner')}
                      className="mt-3 px-4 py-2 bg-rose-600 text-white text-xs font-medium rounded-lg hover:bg-rose-700"
                    >
                      Armar Primer Evento
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projects.slice(0, 4).map(proj => {
                      const venue = venues.find(v => v.id === proj.venueId);
                      return (
                        <div key={proj.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/80 transition-colors gap-3">
                          <div className="space-y-1">
                            <h4 className="font-semibold text-slate-800 text-sm">{proj.eventName}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-3">
                              <span>Cliente: <strong>{proj.clientName}</strong></span>
                              <span>•</span>
                              <span>{proj.eventDate}</span>
                            </p>
                            <p className="text-xs text-rose-600 font-medium">
                              {venue ? venue.name : 'Salón personalizado'} ({proj.guestsCount} invitados)
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewingProject(proj)}
                              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-500" />
                              Ver Ficha / Hoja de Carga
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Guide */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-6 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
                  💡
                </div>
                <h3 className="font-serif font-bold text-slate-800 text-lg">¿Cómo usar la App?</h3>
                <ol className="text-xs text-slate-600 space-y-3 list-decimal list-inside">
                  <li><strong>Registra tu Mobiliario:</strong> Carga tus sillones, mesas y centros de mesa con fotos y stock.</li>
                  <li><strong>Configura los Salones:</strong> Ingresa dimensiones, metros cuadrados y restricciones técnicas.</li>
                  <li><strong>Usa el Planificador:</strong> Ingresa la cantidad de invitados; el sistema calcula mesas necesarias, valida stock y te muestra un plano 2D interactivo.</li>
                  <li><strong>Imprime la Hoja de Flete:</strong> Genera la lista de carga automatizada para tu equipo de armado.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLANIFICADOR & ASISTENTE DE ARMADO */}
        {activeTab === 'planner' && (
          <PlannerModule 
            venues={venues} 
            inventory={inventory} 
            onSaveProject={(newProj) => {
              setProjects(prev => [newProj, ...prev]);
              setActiveTab('projects');
            }}
          />
        )}

        {/* TAB 3: INVENTARIO */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-800">Inventario de Mobiliario y Decoración</h2>
                <p className="text-xs text-slate-500">Gestión de stock físico, características y costos de alquiler</p>
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setItemModalOpen(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Nuevo Ítem
              </button>
            </div>

            {/* Search & Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, estilo o color..."
                  value={invSearch}
                  onChange={e => setInvSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">Categoría:</span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setInvCategoryFilter(cat)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                      invCategoryFilter === cat 
                        ? 'bg-rose-600 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inventory
                .filter(item => {
                  const matchesCat = invCategoryFilter === 'Todas' || item.category === invCategoryFilter;
                  const matchesQuery = item.name.toLowerCase().includes(invSearch.toLowerCase()) || 
                                       item.color.toLowerCase().includes(invSearch.toLowerCase()) ||
                                       item.style.toLowerCase().includes(invSearch.toLowerCase());
                  return matchesCat && matchesQuery;
                })
                .map(item => (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      {/* Image Header */}
                      <div className="h-44 w-full bg-slate-100 relative overflow-hidden group">
                        <img 
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">
                          {item.category}
                        </span>
                        <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                          Stock: {item.totalStock}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-slate-800 text-base leading-snug">{item.name}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>

                        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400 block">Medidas:</span>
                            <span className="font-semibold text-slate-700">{item.dimensions}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Estilo:</span>
                            <span className="font-semibold text-slate-700">{item.style}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Color:</span>
                            <span className="font-semibold text-slate-700">{item.color}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Alquiler x día:</span>
                            <span className="font-bold text-rose-600">${Number(item.rentCost).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setItemModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-500" /> Editar
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: CATÁLOGO DE SALONES */}
        {activeTab === 'venues' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-800">Catálogo de Salones</h2>
                <p className="text-xs text-slate-500">Fichas técnicas de espacios, capacidades y especificaciones de armado</p>
              </div>
              <button
                onClick={() => {
                  setEditingVenue(null);
                  setVenueModalOpen(true);
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Registrar Salón
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {venues.map(v => (
                <div key={v.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
                  <div className="md:w-2/5 h-48 md:h-auto bg-slate-100 relative flex-shrink-0">
                    <img 
                      src={v.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=500&q=80'} 
                      alt={v.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-800 text-lg">{v.name}</h3>
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> Max {v.maxCapacity} p.
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{v.address}</p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-slate-400 block">Superficie Total:</span>
                          <span className="font-semibold text-slate-700">{v.totalArea} m² ({v.dimensions})</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Pista de Baile:</span>
                          <span className="font-semibold text-slate-700">{v.dancefloorArea} m²</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Altura Techos:</span>
                          <span className="font-semibold text-slate-700">{v.ceilingHeight}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Tomacorrientes:</span>
                          <span className="font-semibold text-slate-700 truncate block" title={v.electricOutlets}>{v.electricOutlets}</span>
                        </div>
                      </div>

                      {v.restrictions && (
                        <p className="text-xs text-amber-700 mt-3 bg-amber-50 p-2 rounded-lg border border-amber-200/50 flex items-start gap-1.5">
                          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                          <span><strong>Restricciones:</strong> {v.restrictions}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setEditingVenue(v);
                          setVenueModalOpen(true);
                        }}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-medium flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-500" /> Editar Salón
                      </button>
                      <button
                        onClick={() => handleDeleteVenue(v.id)}
                        className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: EVENTOS GUARDADOS */}
        {activeTab === 'projects' && (
          <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-serif font-bold text-slate-800">Eventos & Cotizaciones Guardadas</h2>
                <p className="text-xs text-slate-500">Historial de ambientaciones diseñadas y hojas de ruta de flete</p>
              </div>
              <button
                onClick={() => setActiveTab('planner')}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                Diseñar Nuevo Evento
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-slate-700">No hay proyectos en la lista</h3>
                <p className="text-slate-400 text-xs max-w-md mx-auto">Crea una nueva ambientación desde el asistente interactivo para guardarla y generar la lista de carga.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(proj => {
                  const venue = venues.find(v => v.id === proj.venueId);
                  return (
                    <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                              {proj.style}
                            </span>
                            <h3 className="font-bold text-slate-800 text-lg mt-1">{proj.eventName}</h3>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Eliminar evento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1.5 text-xs text-slate-600">
                          <p><strong>Cliente:</strong> {proj.clientName}</p>
                          <p><strong>Fecha Evento:</strong> {proj.eventDate}</p>
                          <p><strong>Salón:</strong> {venue ? venue.name : 'Personalizado'}</p>
                          <p><strong>Invitados:</strong> {proj.guestsCount} personas</p>
                          <p><strong>Mobiliario Asignado:</strong> {proj.selectedItems.reduce((a, b) => a + b.quantity, 0)} unidades</p>
                        </div>

                        {proj.totalEstimate > 0 && (
                          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                            <span className="text-slate-400">Presupuesto Estimado:</span>
                            <span className="font-bold text-emerald-600 text-base">${proj.totalEstimate.toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setViewingProject(proj)}
                        className="w-full mt-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
                      >
                        <FileText className="w-4 h-4 text-amber-300" />
                        Ver Ficha & Checklist Carga
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>

      {/* MODAL 1: EDIT/ADD INVENTORY ITEM */}
      {itemModalOpen && (
        <ItemModal 
          item={editingItem}
          categories={categories.filter(c => c !== 'Todas')}
          onClose={() => setItemModalOpen(false)}
          onSave={(savedItem) => {
            if (editingItem) {
              setInventory(prev => prev.map(i => i.id === savedItem.id ? savedItem : i));
            } else {
              setInventory(prev => [savedItem, ...prev]);
            }
            setItemModalOpen(false);
          }}
        />
      )}

      {/* MODAL 2: EDIT/ADD VENUE */}
      {venueModalOpen && (
        <VenueModal
          venue={editingVenue}
          onClose={() => setVenueModalOpen(false)}
          onSave={(savedVenue) => {
            if (editingVenue) {
              setVenues(prev => prev.map(v => v.id === savedVenue.id ? savedVenue : v));
            } else {
              setVenues(prev => [savedVenue, ...prev]);
            }
            setVenueModalOpen(false);
          }}
        />
      )}

      {/* MODAL 3: VIEW PROJECT / PACKING CHECKLIST */}
      {viewingProject && (
        <ProjectViewModal
          project={viewingProject}
          venue={venues.find(v => v.id === viewingProject.venueId)}
          inventory={inventory}
          onClose={() => setViewingProject(null)}
        />
      )}

    </div>
  );
}

// --- SUB-COMPONENT: PLANNER & 2D LAYOUT CALCULATOR MODULE ---
function PlannerModule({ venues, inventory, onSaveProject }) {
  const [step, setStep] = useState(1);

  // Form input fields
  const [eventName, setEventName] = useState('');
  const [clientName, setClientName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedVenueId, setSelectedVenueId] = useState(venues[0]?.id || '');
  const [guestsCount, setGuestsCount] = useState(120);
  const [eventStyle, setEventStyle] = useState('Boho Chic / Rústico');
  const [notes, setNotes] = useState('');

  // Items selection state: { itemId: quantity }
  const [selectedItemsMap, setSelectedItemsMap] = useState({});

  const selectedVenue = useMemo(() => {
    return venues.find(v => v.id === selectedVenueId);
  }, [venues, selectedVenueId]);

  // AUTOMATIC CALCULATIONS
  const calculations = useMemo(() => {
    const guests = Number(guestsCount) || 0;
    
    // Mesas de 10 personas necesarias
    const requiredTables = Math.ceil(guests / 10);
    // Sillas con 5% de margen
    const requiredChairs = Math.ceil(guests * 1.05);

    // Estimación de espacio por comensal (aprox 1.8 m2 por persona incluyendo paso)
    const requiredSpaceForDining = guests * 1.8;
    const dancefloor = selectedVenue ? Number(selectedVenue.dancefloorArea) || 40 : 40;
    const totalRequiredSpace = requiredSpaceForDining + dancefloor;

    const availableVenueSpace = selectedVenue ? Number(selectedVenue.totalArea) || 200 : 200;
    const isSpaceEnough = availableVenueSpace >= totalRequiredSpace;
    const occupancyPercentage = Math.round((totalRequiredSpace / availableVenueSpace) * 100);

    return {
      requiredTables,
      requiredChairs,
      requiredSpaceForDining,
      totalRequiredSpace,
      availableVenueSpace,
      isSpaceEnough,
      occupancyPercentage
    };
  }, [guestsCount, selectedVenue]);

  // Pre-fill suggested items based on calculation
  const applyAutoSuggestions = () => {
    const map = {};
    
    // Find round table
    const tableItem = inventory.find(i => i.name.toLowerCase().includes('mesa redonda') || i.category === 'Mesas y Sillas');
    if (tableItem) map[tableItem.id] = calculations.requiredTables;

    // Find chairs
    const chairItem = inventory.find(i => i.name.toLowerCase().includes('silla') || i.category === 'Mesas y Sillas');
    if (chairItem) map[chairItem.id] = calculations.requiredChairs;

    // Find centerpieces
    const centerpiece = inventory.find(i => i.category === 'Centros de Mesa');
    if (centerpiece) map[centerpiece.id] = calculations.requiredTables;

    // Find living couch
    const couch = inventory.find(i => i.category === 'Mobiliario Living');
    if (couch) map[couch.id] = 2;

    setSelectedItemsMap(map);
  };

  useEffect(() => {
    applyAutoSuggestions();
  }, [guestsCount, selectedVenueId]);

  const handleItemQtyChange = (itemId, qty) => {
    const val = Math.max(0, Number(qty));
    setSelectedItemsMap(prev => ({
      ...prev,
      [itemId]: val
    }));
  };

  const calculateTotalCost = () => {
    let sum = 0;
    Object.entries(selectedItemsMap).forEach(([id, qty]) => {
      const item = inventory.find(i => i.id === id);
      if (item && qty > 0) {
        sum += item.rentCost * qty;
      }
    });
    return sum;
  };

  const handleFinalSave = () => {
    if (!eventName || !clientName) {
      alert('Por favor completa el nombre del evento y del cliente.');
      return;
    }

    const selectedItemsArray = Object.entries(selectedItemsMap)
      .filter(([_, qty]) => qty > 0)
      .map(([itemId, quantity]) => ({ itemId, quantity }));

    const newProject = {
      id: 'proj-' + Date.now(),
      eventName,
      clientName,
      eventDate: eventDate || new Date().toISOString().split('T')[0],
      venueId: selectedVenueId,
      guestsCount: Number(guestsCount),
      style: eventStyle,
      selectedItems: selectedItemsArray,
      notes,
      totalEstimate: calculateTotalCost(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    onSaveProject(newProject);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Module Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">Planificador de Eventos & Asistente Visual</h2>
          <p className="text-xs text-slate-500">Calculador de capacidad, selección de mobiliario y maquetación del salón</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setStep(1)} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${step === 1 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}
          >
            1. Datos & Cálculo
          </button>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <button 
            onClick={() => setStep(2)} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${step === 2 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-600'}`}
          >
            2. Mobiliario & Layout 2D
          </button>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Input */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h3 className="font-serif font-bold text-slate-800 text-lg pb-3 border-b border-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" /> Datos del Evento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Evento *</label>
                <input
                  type="text"
                  placeholder="Ej: Boda de Lucía y Carlos"
                  value={eventName}
                  onChange={e => setEventName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombre del Cliente *</label>
                <input
                  type="text"
                  placeholder="Ej: Lucía Gómez"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Fecha del Evento</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estilo / Temática</label>
                <select
                  value={eventStyle}
                  onChange={e => setEventStyle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                >
                  <option value="Boho Chic / Rústico">Boho Chic / Rústico</option>
                  <option value="Elegante / Glam">Elegante / Glam</option>
                  <option value="Clásico / Vintage">Clásico / Vintage</option>
                  <option value="Minimalista / Moderno">Minimalista / Moderno</option>
                  <option value="Empresarial / Formal">Empresarial / Formal</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Salón Seleccionado</label>
                <select
                  value={selectedVenueId}
                  onChange={e => setSelectedVenueId(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none font-medium text-slate-800"
                >
                  {venues.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.name} (Cap: {v.maxCapacity}p - {v.totalArea} m²)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cantidad de Invitados</label>
                <input
                  type="number"
                  min="1"
                  value={guestsCount}
                  onChange={e => setGuestsCount(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none font-bold text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 text-xs block mb-1">Notas o Requerimientos Especiales</label>
              <textarea
                rows={3}
                placeholder="Ej: Ubicación del buffet, pedidos especiales de la novia..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-md transition-transform active:scale-95"
              >
                Siguiente: Mobiliario & Layout <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time Assistant Analysis */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-base">
                <Sparkles className="w-5 h-5" />
                Diagnóstico Automático
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center">
                  <span>Mesas Redondas Recomendadas:</span>
                  <span className="font-bold text-amber-300 text-base">{calculations.requiredTables} mesas</span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 flex justify-between items-center">
                  <span>Sillas Necesarias (con margen):</span>
                  <span className="font-bold text-amber-300 text-base">{calculations.requiredChairs} sillas</span>
                </div>

                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex justify-between">
                    <span>Ocupación Estimada del Salón:</span>
                    <span className={`font-bold ${calculations.isSpaceEnough ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {calculations.occupancyPercentage}% del espacio
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${calculations.isSpaceEnough ? 'bg-emerald-400' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, calculations.occupancyPercentage)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Spatial Alert */}
              {calculations.isSpaceEnough ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                  <span>El espacio del salón <strong>{selectedVenue?.name}</strong> es adecuado para {guestsCount} invitados + pista de baile.</span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
                  <span>¡Atención! El número de invitados ({guestsCount}) puede ajustar demasiado la circulación en este salón ({selectedVenue?.totalArea} m²). Considera reducir livings o ampliar zona exterior.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Inventory Selection */}
            <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 h-[650px] flex flex-col">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="font-serif font-bold text-slate-800 text-base">Asignar Mobiliario</h3>
                <button 
                  onClick={applyAutoSuggestions}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                  title="Recalcular según número de invitados"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Auto-Sugerir
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {inventory.map(item => {
                  const currentQty = selectedItemsMap[item.id] || 0;
                  const hasStockAlert = currentQty > item.totalStock;

                  return (
                    <div key={item.id} className={`p-3 rounded-xl border text-xs transition-colors ${currentQty > 0 ? 'border-rose-300 bg-rose-50/30' : 'border-slate-100 bg-slate-50'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-slate-800">{item.name}</p>
                          <p className="text-[10px] text-slate-500">Stock total: {item.totalStock} unidades</p>
                        </div>
                        <span className="font-semibold text-rose-600">${item.rentCost.toLocaleString()}</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">{item.category}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleItemQtyChange(item.id, currentQty - 1)}
                            className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-700"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={currentQty}
                            onChange={e => handleItemQtyChange(item.id, e.target.value)}
                            className="w-12 text-center p-1 border border-slate-200 rounded font-bold bg-white"
                          />
                          <button
                            onClick={() => handleItemQtyChange(item.id, currentQty + 1)}
                            className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center font-bold text-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {hasStockAlert && (
                        <p className="text-[10px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Excede el stock disponible ({item.totalStock})
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600">Presupuesto Mobiliario:</span>
                <span className="font-bold text-slate-900 text-lg">${calculateTotalCost().toLocaleString()}</span>
              </div>
            </div>

            {/* Right: Interactive 2D Venue Layout Canvas */}
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-bold text-lg text-rose-100 flex items-center gap-2">
                    <Grid className="w-5 h-5 text-amber-300" /> Layout Visual 2D del Salón
                  </h3>
                  <p className="text-xs text-slate-400">Representación esquemática a escala para {selectedVenue?.name}</p>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> Mesas
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span> Livings
                  </span>
                  <span className="flex items-center gap-1 px-2 py-1 bg-sky-500/20 text-sky-300 rounded border border-sky-500/30">
                    <span className="w-2 h-2 rounded-full bg-sky-400"></span> Pista / Escenario
                  </span>
                </div>
              </div>

              {/* CANVAS GRID CONTAINER */}
              <div className="w-full h-[450px] bg-slate-950/80 rounded-xl border border-slate-800 relative p-6 overflow-hidden flex flex-col justify-between">
                
                {/* Stage / DJ Top Zone */}
                <div className="w-full h-12 bg-slate-800/90 border border-slate-700 rounded-lg flex items-center justify-center text-xs font-semibold tracking-widest uppercase text-slate-300 shadow-inner">
                  🎭 Escenario / Cabina DJ / Pantalla LED
                </div>

                {/* Main Hall Interactive Floor */}
                <div className="my-4 flex-1 grid grid-cols-6 gap-3 items-center justify-center p-2 relative border border-dashed border-slate-800 rounded-lg">
                  
                  {/* Dancefloor area */}
                  <div className="col-span-2 h-full bg-sky-950/40 border-2 border-sky-500/30 rounded-xl flex flex-col items-center justify-center text-center p-2 text-sky-200">
                    <span className="font-bold text-xs uppercase tracking-wider">Pista de Baile</span>
                    <span className="text-[10px] text-sky-400/80">{selectedVenue?.dancefloorArea || 40} m²</span>
                  </div>

                  {/* Dynamic Tables Layout */}
                  <div className="col-span-4 h-full grid grid-cols-4 gap-3 items-center justify-items-center overflow-y-auto p-1">
                    {Array.from({ length: Math.min(24, selectedItemsMap[inventory.find(i => i.name.toLowerCase().includes('mesa'))?.id] || calculations.requiredTables) }).map((_, idx) => (
                      <div 
                        key={idx}
                        className="w-12 h-12 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-200 shadow-lg hover:scale-110 transition-transform cursor-pointer"
                        title={`Mesa ${idx + 1} (10 personas)`}
                      >
                        M{idx + 1}
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Lounge / Reception Area */}
                <div className="w-full h-14 bg-purple-950/30 border border-purple-500/30 rounded-lg flex items-center justify-around px-4 text-xs text-purple-200">
                  <span className="font-semibold text-[11px] text-purple-300">🛋️ Zona Living & Recepción:</span>
                  <div className="flex gap-2">
                    {Array.from({ length: Math.min(6, selectedItemsMap[inventory.find(i => i.category === 'Mobiliario Living')?.id] || 2) }).map((_, i) => (
                      <span key={i} className="px-2 py-1 bg-purple-500/30 rounded text-[10px] border border-purple-400/40">
                        Sillón #{i + 1}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grid markings overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
              </div>

              {/* Save & Finish Actions */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Volver a Datos
                </button>

                <button
                  onClick={handleFinalSave}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" />
                  Guardar Evento & Generar Ficha
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENT: MODAL INVENTORY ITEM ---
function ItemModal({ item, categories, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: item ? item.id : 'mob-' + Date.now(),
    name: item ? item.name : '',
    category: item ? item.category : categories[0] || 'Mobiliario Living',
    totalStock: item ? item.totalStock : 10,
    rentCost: item ? item.rentCost : 0,
    dimensions: item ? item.dimensions : '',
    color: item ? item.color : '',
    style: item ? item.style : '',
    description: item ? item.description : '',
    imageUrl: item ? item.imageUrl : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Ingresa un nombre para el producto');
    onSave({
      ...formData,
      totalStock: Number(formData.totalStock),
      rentCost: Number(formData.rentCost)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="font-serif font-bold text-slate-800 text-lg">
            {item ? 'Editar Mobiliario' : 'Agregar Nuevo Mobiliario'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nombre del Producto *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              placeholder="Ej: Sillón Chesterfield Capitoné"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Categoría</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Stock Físico Total</label>
              <input
                type="number"
                min="0"
                value={formData.totalStock}
                onChange={e => setFormData({ ...formData, totalStock: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Costo Alquiler x Día ($)</label>
              <input
                type="number"
                min="0"
                value={formData.rentCost}
                onChange={e => setFormData({ ...formData, rentCost: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none font-bold text-rose-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Dimensiones (Ancho x Alto x Prof)</label>
              <input
                type="text"
                placeholder="Ej: 200 x 90 x 80 cm"
                value={formData.dimensions}
                onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Color / Acabado</label>
              <input
                type="text"
                placeholder="Ej: Dorado Glam / Blanco"
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Estilo Decorativo</label>
              <input
                type="text"
                placeholder="Ej: Boho Chic / Vintage"
                value={formData.style}
                onChange={e => setFormData({ ...formData, style: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">URL de Imagen (Opcional)</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Descripción / Cuidados</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-semibold shadow-md"
            >
              Guardar Mobiliario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: MODAL VENUE ---
function VenueModal({ venue, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: venue ? venue.id : 'ven-' + Date.now(),
    name: venue ? venue.name : '',
    maxCapacity: venue ? venue.maxCapacity : 150,
    totalArea: venue ? venue.totalArea : 200,
    dimensions: venue ? venue.dimensions : '',
    dancefloorArea: venue ? venue.dancefloorArea : 40,
    ceilingHeight: venue ? venue.ceilingHeight : '4.0 m',
    electricOutlets: venue ? venue.electricOutlets : '',
    restrictions: venue ? venue.restrictions : '',
    address: venue ? venue.address : '',
    imageUrl: venue ? venue.imageUrl : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Ingresa el nombre del salón');
    onSave({
      ...formData,
      maxCapacity: Number(formData.maxCapacity),
      totalArea: Number(formData.totalArea),
      dancefloorArea: Number(formData.dancefloorArea)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="font-serif font-bold text-slate-800 text-lg">
            {venue ? 'Editar Ficha de Salón' : 'Registrar Nuevo Salón'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nombre del Salón / Espacio *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              placeholder="Ej: Salón Las Acacias"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Capacidad Máxima (personas)</label>
              <input
                type="number"
                value={formData.maxCapacity}
                onChange={e => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Superficie Total (m²)</label>
              <input
                type="number"
                value={formData.totalArea}
                onChange={e => setFormData({ ...formData, totalArea: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Dimensiones (Largo x Ancho)</label>
              <input
                type="text"
                placeholder="Ej: 25 x 15 m"
                value={formData.dimensions}
                onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Área Pista Baile (m²)</label>
              <input
                type="number"
                value={formData.dancefloorArea}
                onChange={e => setFormData({ ...formData, dancefloorArea: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Altura Techos</label>
              <input
                type="text"
                placeholder="Ej: 4.5 m"
                value={formData.ceilingHeight}
                onChange={e => setFormData({ ...formData, ceilingHeight: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Dirección / Ubicación</label>
              <input
                type="text"
                placeholder="Ej: Av. Principal 123"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2.5 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Puntos de Conexión Eléctrica</label>
            <input
              type="text"
              placeholder="Ej: Tableros trifásicos en lateral y escenario"
              value={formData.electricOutlets}
              onChange={e => setFormData({ ...formData, electricOutlets: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Restricciones del Espacio</label>
            <textarea
              rows={2}
              placeholder="Ej: Prohibido pegar cinta en paredes, horario límite de desmontaje..."
              value={formData.restrictions}
              onChange={e => setFormData({ ...formData, restrictions: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">URL Foto del Salón</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-2.5 border border-slate-200 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-semibold shadow-md"
            >
              Guardar Salón
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: PROJECT SHEET & PACKING CHECKLIST MODAL ---
function ProjectViewModal({ project, venue, inventory, onClose }) {
  const printSheet = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto print:p-0 print:max-h-none print:shadow-none">
        
        {/* Printable Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-serif font-bold text-xl">
              <Sparkles className="w-5 h-5" /> Nancy Ambientaciones
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">{project.eventName}</h2>
            <p className="text-xs text-slate-500">Hoja de Carga para Flete & Ficha Técnica de Armado</p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={printSheet}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" /> Imprimir / PDF
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div>
            <span className="text-slate-400 block font-medium">Cliente:</span>
            <span className="font-bold text-slate-800">{project.clientName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Fecha Evento:</span>
            <span className="font-bold text-slate-800">{project.eventDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Salón:</span>
            <span className="font-bold text-slate-800">{venue ? venue.name : 'Personalizado'}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Invitados:</span>
            <span className="font-bold text-slate-800">{project.guestsCount} personas</span>
          </div>
        </div>

        {/* Packing Checklist Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <Truck className="w-4 h-4 text-rose-600" /> Lista de Carga Físicos (Checklist de Flete)
          </h3>

          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <th className="p-2.5 w-10 text-center">✓</th>
                <th className="p-2.5">Ítem / Mobiliario</th>
                <th className="p-2.5">Categoría</th>
                <th className="p-2.5 text-center">Cant. Requerida</th>
                <th className="p-2.5 text-right">Subtotal Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {project.selectedItems.map((pi, idx) => {
                const item = inventory.find(i => i.id === pi.itemId);
                const subtotal = item ? item.rentCost * pi.quantity : 0;

                return (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="p-2.5 text-center">
                      <input type="checkbox" className="rounded border-slate-300 w-4 h-4 text-rose-600" />
                    </td>
                    <td className="p-2.5 font-bold text-slate-800">
                      {item ? item.name : 'Ítem no encontrado'}
                    </td>
                    <td className="p-2.5 text-slate-500">{item?.category}</td>
                    <td className="p-2.5 text-center font-bold text-rose-600 text-sm">
                      {pi.quantity} u.
                    </td>
                    <td className="p-2.5 text-right font-semibold text-slate-700">
                      ${subtotal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Special notes */}
        {project.notes && (
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-800 space-y-1">
            <p className="font-bold">Observaciones para el Equipo de Montaje:</p>
            <p className="text-slate-700">{project.notes}</p>
          </div>
        )}

        {/* Budget Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Total Estimado Alquiler Mobiliario:</span>
          <span className="text-xl font-bold text-slate-900">${project.totalEstimate?.toLocaleString()}</span>
        </div>

      </div>
    </div>
  );
}