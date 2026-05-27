'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, LoaderCircle, Circle, Monitor, Smartphone, Wifi, Mail, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Monitor, Smartphone, Wifi, Mail };

type TaskStatus = 'completed' | 'progress' | 'pending';

type TabItem = {
  iconKey: string;
  label: string;
  description: string;
  image: string;
  card: {
    heading: string;
    badge: string;
    goal: string;
    tasks: { title: string; meta: string; status: TaskStatus }[];
  };
};

export default function ClippedVideoTab({ items, heading, description, author }: {
  items: TabItem[];
  heading: string;
  description: string;
  author?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = items[activeTab];

  return (
    <section className="bg-[#f5f5f3] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start mb-10">
          <div>
            <h2 className="text-[46px] leading-[50px] tracking-tight font-bold text-[#131313] max-w-2xl">
              {heading}
            </h2>
          </div>
          <div>
            <p className="text-[18px] leading-[32px] text-[#666] max-w-lg">
              {description}
              {author && <span className="font-medium text-black"> {author}</span>}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Floating tabs */}
        <div className="absolute left-2 bottom-16 z-20">
          <div className="bg-white rounded-[28px] shadow-xl border border-[#e8e8e8] p-3 w-[240px]">
            <div className="flex flex-col gap-2">
              {items.map((tab, index) => {
                const Icon = iconMap[tab.iconKey] ?? Circle;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 border ${
                      activeTab === index
                        ? 'bg-[#f0f7ff] border-[#2563eb]'
                        : 'border-transparent hover:border-[#2563eb] hover:bg-[#f8fbff]'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        activeTab === index ? 'text-[#2563eb]' : 'text-[#131313] group-hover:text-[#2563eb]'
                      }`}
                    />
                    <span
                      className={`text-[15px] font-medium transition-colors duration-300 ${
                        activeTab === index ? 'text-[#2563eb]' : 'text-[#131313] group-hover:text-[#2563eb]'
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Image container */}
        <div
          className="relative overflow-hidden h-[690px]"
          style={{
            clipPath: 'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 30% 100%, 22% 88%, 0 88%)',
            borderRadius: '34px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeItem.image}
              src={activeItem.image}
              alt={activeItem.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/40" />

          {/* Center card */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.card.heading}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35 }}
                className="w-[320px] rounded-[26px] border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-semibold text-[#131313]">{activeItem.card.heading}</h3>
                  <span className="text-[11px] bg-[#eff6ff] text-[#2563eb] px-2 py-1 rounded-md">
                    {activeItem.card.badge}
                  </span>
                </div>

                <div className="mt-4 border border-[#e7e7e7] rounded-xl p-3">
                  <p className="text-[11px] text-[#777]">Doel</p>
                  <p className="text-[13px] leading-[20px] mt-1 text-[#131313]">{activeItem.card.goal}</p>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {activeItem.card.tasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-[2px]">
                        {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-[#2563eb]" />}
                        {task.status === 'progress' && <LoaderCircle className="w-4 h-4 text-[#2563eb]" />}
                        {task.status === 'pending' && <Circle className="w-4 h-4 text-[#bdbdbd]" />}
                      </div>
                      <div>
                        <p className={`text-[13px] ${
                          task.status === 'completed' ? 'line-through text-[#666]' :
                          task.status === 'progress' ? 'text-[#2563eb] font-medium' : 'text-[#999]'
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-[11px] text-[#999]">{task.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-5 text-[11px] text-[#888]">
                  <span>Vancoillie IT Hulp</span>
                  <span>Roeselare</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
