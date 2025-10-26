import { Play } from 'lucide-react';

export default function WhoAreWe() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="text-sm text-gray-600 mb-4">The Modex Story</div>
          <h2 className="text-5xl font-medium leading-tight text-black mb-8">
            Building the Future of Digital Creation.
          </h2>
          <button className="px-6 py-3 bg-black text-white rounded-[15px] font-medium leading-tight hover:bg-gray-600 transition-colors">
            <a href='/dashboard/community'>
              View Community
            </a>
          </button>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-4">
              <path d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C45.3 56 56 45.3 56 32C56 18.7 45.3 8 32 8Z" stroke="black" strokeWidth="2"/>
              <path d="M32 20V32L40 40" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="32" cy="32" r="3" fill="black"/>
              <path d="M20 24L24 28M44 24L40 28M24 40L20 44M40 40L44 44" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Modex AI is dedicated to providing powerful, accessible AI tools that simplify the content creation process for businesses of any size.
          </p>
        </div>
      </div>

      {/* <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="aspect-video flex items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-xl">
              <Play className="w-10 h-10 text-white ml-1" fill="white" />
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          </div>
        </div>
      </div> */}
    </section>
  );
}
