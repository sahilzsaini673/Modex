import { Play } from 'lucide-react';

export default function Hero() {
  return (
    
    <section className="p-4">
      <div className="relative rounded-[15px] overflow-hidden shadow-lg" style={{ height: '96vh' }}>

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src='/background.mp4' type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Navbar */}
        <nav className="relative flex items-center justify-between px-8 py-6 z-10">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M6 26V6L16 18L26 6V26H22V14L16 22L10 14V26H6Z"
                stroke="white"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              />
            </svg>
            <span className="text-xl font-normal leading-tight text-white">Modex AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="font-normal leading-tight text-white hover:underline transition-all">Home</a>
            <a href="#features" className="font-normal leading-tight text-white hover:underline transition-all">Features</a>
            <a href="/dashboard/community" className="font-normal leading-tight text-white hover:underline transition-all">Explore</a>
            {/* <a href="#blog" className="font-normal leading-tight text-white hover:underline transition-all">Blog</a> */}
            <a href="#contact" className="font-normal leading-tight text-white hover:underline transition-all">Contact</a>
          </div>

          <a href='/login'>
            <button className="bg-white text-black cursor-pointer border-1 border-black px-6 py-2.5 rounded-[15px] font-medium leading-tight hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </a>

        </nav>

        {/* Hero Content */}
        <div className="relative px-8 flex items-center z-10" style={{ height: 'calc(100vh - 80px)' }}>
          <div className="max-w-3xl">
            <h1 className="text-7xl font-medium leading-tight text-white mb-8">
              Generate Content in Seconds, Not Hours.
            </h1>

            {/* <button className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white rounded-[15px] font-normal leading-tight text-white hover:bg-white/20 transition-colors">
              <Play className="w-5 h-5" />
              Demo Video
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
