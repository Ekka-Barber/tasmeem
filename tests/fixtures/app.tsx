import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import { FaStar } from 'react-icons/fa'

const features = [
  { icon: Zap, title: 'Fast', body: 'Blazing fast builds for every team.' },
]

export default function Landing() {
  return (
    <main className="h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
      <span className="rounded-full px-3 py-1 text-xs">New · v2</span>
      <h1 className="text-6xl">Elevate your workflow</h1>
      <p className="uppercase tracking-widest text-xs text-indigo-600">Why us</p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl shadow-lg p-6 transition-all hover:scale-105">
            <div className="rounded-xl bg-indigo-100 p-3 w-12 h-12"><f.icon /></div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </motion.div>
      <button className="bg-indigo-600 outline-none">Get started <ArrowRight /></button>
      <FaStar />
    </main>
  )
}
