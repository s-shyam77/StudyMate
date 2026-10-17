
import { useEffect, useState } from 'react'
import {
  Home,
  CalendarDays,
  CheckSquare,
  ChartNoAxesColumn,
  Settings,
  BookOpen,
  Clock,
  Flame,
  Plus,
  Trash2,
  Moon,
  Sun,
  GraduationCap,
  Target,
  Search,
  Check,
  Menu,
  X,
  Sparkles,
  CircleUserRound,
} from 'lucide-react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Practice DSA problems', subject: 'DSA', time: '45 min', done: true },
  { id: 2, title: 'Revise OOPS concepts', subject: 'OOPS', time: '30 min', done: false },
  { id: 3, title: 'Study Digital Electronics', subject: 'Digital Electronics', time: '40 min', done: false },
  { id: 4, title: 'Complete project work', subject: 'Projects', time: '60 min', done: false },
]

const initialSubjects = [
  { name: 'Data Structures & Algorithms', short: 'DSA', color: 'blue', progress: 72 },
  { name: 'Object Oriented Programming', short: 'OOPS', color: 'purple', progress: 58 },
  { name: 'Digital Electronics', short: 'DE', color: 'orange', progress: 40 },
  { name: 'Software Engineering', short: 'SE', color: 'green', progress: 85 },
]

function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('studymate-theme') !== 'light'
    } catch {
      return true
    }
  })
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('studymate-tasks')
      return saved ? JSON.parse(saved) : initialTasks
    } catch {
      return initialTasks
    }
  })
  const [newTask, setNewTask] = useState('')
  const [newSubject, setNewSubject] = useState('DSA')
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [showForm, setShowForm] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('studymate-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('studymate-theme', dark ? 'dark' : 'light')
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const completed = tasks.filter((task) => task.done).length
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0
  const visibleTasks = tasks.filter((task) =>
    `${task.title} ${task.subject}`.toLowerCase().includes(search.toLowerCase())
  )

  function addTask(event) {
    event.preventDefault()
    if (!newTask.trim()) return

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title: newTask.trim(),
        subject: newSubject,
        time: '30 min',
        done: false,
      },
    ])
    setNewTask('')
    setShowForm(false)
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  const navItems = [
    { label: 'Dashboard', icon: Home },
    { label: 'My Tasks', icon: CheckSquare },
    { label: 'Study Planner', icon: CalendarDays },
    { label: 'Progress', icon: ChartNoAxesColumn },
    { label: 'Settings', icon: Settings },
  ]

  return (
    <div className={`app-shell ${dark ? 'dark' : 'light'}`}>
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={25} /></div>
          <div>
            <h2>StudyMate</h2>
            <span>YOUR STUDY SPACE</span>
          </div>
          <button className="icon-button close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <nav className="navigation">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activeNav === label ? 'active' : ''}`}
              onClick={() => {
                setActiveNav(label)
                setMenuOpen(false)
              }}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === 'My Tasks' && <span className="nav-count">{tasks.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-tip">
          <div className="tip-icon"><Sparkles size={18} /></div>
          <h3>Keep going!</h3>
          <p>Small progress every day adds up to big results.</p>
          <div className="tip-progress"><span style={{ width: `${progress}%` }} /></div>
          <span className="tip-caption">{progress}% of today's tasks completed</span>
        </div>

        <div className="profile">
          <div className="avatar">S</div>
          <div className="profile-copy">
            <strong>Student</strong>
            <span>Keep learning ✨</span>
          </div>
          <CircleUserRound size={20} className="profile-icon" />
        </div>
      </aside>

      {menuOpen && <button className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <div>
              <span className="breadcrumb">Workspace /</span>
              <strong>{activeNav}</strong>
            </div>
          </div>
          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
              />
              {search && <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}
            </label>
            <button
              className="icon-button theme-button"
              onClick={() => setDark((current) => !current)}
              aria-label="Toggle theme"
              title="Toggle dark/light mode"
            >
              {dark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={15} /> YOUR PERSONAL STUDY DASHBOARD</div>
              <h1>{activeNav === 'Dashboard' ? 'Let’s make today count.' : activeNav}</h1>
              <p className="welcome-subtitle">A little progress today, a big difference tomorrow.</p>
            </div>
            <div className="date-chip"><CalendarDays size={17} /> Your learning journey</div>
          </section>

          <section className="hero-banner">
            <div className="hero-copy">
              <span className="hero-label"><Flame size={15} /> BUILD YOUR MOMENTUM</span>
              <h2>Focus on your goals.<br /><span>One task at a time.</span></h2>
              <p>You don't have to do everything today. Just take the next step.</p>
              <button className="hero-button" onClick={() => {
                setActiveNav('My Tasks')
                document.getElementById('tasks-section')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                View my tasks <span>→</span>
              </button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-circle"><BookOpen size={56} strokeWidth={1.4} /></div>
              <div className="floating-card floating-card-top"><Target size={17} /><span>Stay focused</span></div>
              <div className="floating-card floating-card-bottom"><Check size={17} /><span>Keep improving</span></div>
              <div className="sparkle sparkle-one">✦</div>
              <div className="sparkle sparkle-two">✧</div>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-top"><span>Today's tasks</span><div className="stat-icon stat-blue"><CheckSquare size={20} /></div></div>
              <div className="stat-number">{tasks.length}<span className="stat-unit"> tasks</span></div>
              <div className="stat-foot">Your plan for today</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Completed</span><div className="stat-icon stat-green"><Check size={20} /></div></div>
              <div className="stat-number">{completed}<span className="stat-muted"> / {tasks.length}</span></div>
              <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
              <div className="stat-foot">{progress}% completion rate</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Study time goal</span><div className="stat-icon stat-purple"><Clock size={20} /></div></div>
              <div className="stat-number">2.5<span className="stat-unit"> hrs</span></div>
              <div className="stat-foot">Set aside time to learn</div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span>Stay consistent</span><div className="stat-icon stat-orange"><Flame size={20} /></div></div>
              <div className="stat-number">1<span className="stat-unit"> day</span></div>
              <div className="stat-foot">Start building your streak</div>
            </article>
          </section>

          <div className="dashboard-grid">
            <section className="panel tasks-panel" id="tasks-section">
              <div className="panel-heading">
                <div>
                  <div className="heading-title"><h2>Today's tasks</h2><span className="task-badge">{tasks.length}</span></div>
                  <p>Make every study session count.</p>
                </div>
                <button className="primary-button" onClick={() => setShowForm((current) => !current)}>
                  {showForm ? <X size={17} /> : <Plus size={17} />}
                  {showForm ? 'Cancel' : 'Add task'}
                </button>
              </div>

              {showForm && (
                <form className="task-form" onSubmit={addTask}>
                  <label>
                    Task name
                    <input
                      autoFocus
                      value={newTask}
                      onChange={(event) => setNewTask(event.target.value)}
                      placeholder="e.g. Revise linked lists"
                      required
                    />
                  </label>
                  <label>
                    Subject
                    <select value={newSubject} onChange={(event) => setNewSubject(event.target.value)}>
                      <option>DSA</option>
                      <option>OOPS</option>
                      <option>Digital Electronics</option>
                      <option>Software Engineering</option>
                      <option>Projects</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <button className="primary-button form-submit" type="submit"><Plus size={17} /> Save task</button>
                </form>
              )}

              <div className="task-list">
                {visibleTasks.map((task) => (
                  <article className={`task-row ${task.done ? 'task-done' : ''}`} key={task.id}>
                    <button
                      className={`task-check ${task.done ? 'checked' : ''}`}
                      onClick={() => toggleTask(task.id)}
                      aria-label={task.done ? 'Mark task incomplete' : 'Mark task complete'}
                    >
                      {task.done && <Check size={15} />}
                    </button>
                    <div className="task-copy">
                      <strong>{task.title}</strong>
                      <div className="task-meta"><span className={`subject-dot ${task.subject.toLowerCase().replace(/\s+/g, '-')}`} />{task.subject}<span className="meta-divider">·</span><Clock size={13} />{task.time}</div>
                    </div>
                    <span className={`status-pill ${task.done ? 'status-complete' : 'status-pending'}`}>
                      {task.done ? 'Completed' : 'To do'}
                    </span>
                    <button className="delete-button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete task"><Trash2 size={16} /></button>
                  </article>
                ))}
                {visibleTasks.length === 0 && (
                  <div className="empty-state">
                    <Search size={25} />
                    <strong>No tasks found</strong>
                    <span>Try another search or add a new task.</span>
                  </div>
                )}
              </div>

              <div className="task-footer">
                <span>{completed} of {tasks.length} tasks completed</span>
                <span className="footer-progress">{progress}%</span>
              </div>
              <div className="large-progress"><span style={{ width: `${progress}%` }} /></div>
            </section>

            <section className="panel subjects-panel">
              <div className="panel-heading">
                <div><h2>Study subjects</h2><p>Keep your learning balanced.</p></div>
                <span className="subtle-icon"><BookOpen size={19} /></span>
              </div>
              <div className="subject-list">
                {initialSubjects.map((subject) => (
                  <article className="subject-row" key={subject.short}>
                    <div className={`subject-symbol ${subject.color}`}><BookOpen size={18} /></div>
                    <div className="subject-info">
                      <div className="subject-title-row"><strong>{subject.name}</strong><span>{subject.progress}%</span></div>
                      <div className="subject-progress"><span className={subject.color} style={{ width: `${subject.progress}%` }} /></div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="subject-note"><Target size={17} /><span>Consistency beats cramming. Keep showing up.</span></div>
            </section>
          </div>

          <footer className="page-footer">
            <span>Made for learners, one day at a time <span className="footer-heart">♥</span></span>
            <span>StudyMate · Learn. Focus. Grow.</span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
