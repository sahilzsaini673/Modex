"use client"
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function FeatureShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const features = [
    { id: 1, title: 'AI Writing Interface', color: 'from-purple-100 to-blue-100' },
    { id: 2, title: 'Generated Image Art', color: 'from-pink-100 to-orange-100' },
    { id: 3, title: 'Background Removed', color: 'from-green-100 to-teal-100' },
    { id: 4, title: 'Audio Transcription', color: 'from-yellow-100 to-red-100' },
  ];

  useEffect(() => {
    if (isAutoScrolling) {
      const interval = setInterval(() => {
        setScrollPosition((prev) => (prev + 1) % 1280);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isAutoScrolling]);

  useEffect(() => {
    if (!isAutoScrolling) {
      setScrollPosition(currentSlide * 320);
    }
  }, [currentSlide, isAutoScrolling]);

  const nextSlide = () => {
    setIsAutoScrolling(false);
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setIsAutoScrolling(false);
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id='features' className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <div className="relative overflow-hidden mb-8 h-64 rounded-2xl">
            <div
              className="flex gap-4 absolute"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              {[...features, ...features, ...features].map((feature, idx) => (
                <div
                  key={idx}
                  className={`w-80 h-64 rounded-2xl bg-gradient-to-br ${feature.color} flex-shrink-0 flex items-center justify-center shadow-md`}
                >
                  <span className="text-lg font-medium text-gray-700">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-medium">0{currentSlide + 1}/04</span>
              <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / features.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <h2 className="text-4xl font-medium leading-tight text-black mb-6">
            3-in-1 Power: Writing, Design, & Editing.
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Modex AI is a unified creative suite, leveraging cutting-edge models to draft perfect articles, design stunning visuals, and instantly prepare product photos for e-commerce.
          </p>
        </div>

        <div>
          <div className={`bg-gradient-to-br ${features[currentSlide].color} rounded-2xl p-8 mb-8 shadow-sm transition-all duration-500`}>
            <div className="bg-white rounded-xl p-6 shadow-md min-h-[300px] flex items-center justify-center">
              {currentSlide === 0 && (
                <div className="space-y-4 w-full">
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
              )}
              {currentSlide === 1 && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg relative overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/34103372/pexels-photo-34103372.jpeg"
                      alt="image1"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-orange-200 to-yellow-200 rounded-lg relative overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/33876543/pexels-photo-33876543.jpeg"
                      alt="image2"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-blue-200 to-teal-200 rounded-lg relative overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/10000027/pexels-photo-10000027.jpeg"
                      alt="image3"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-green-200 to-emerald-200 rounded-lg relative overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/10000088/pexels-photo-10000088.jpeg"
                      alt="image4"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

              )}
              {currentSlide === 2 && (
                <div className="grid grid-cols-2 gap-6 w-full">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Before</div>
                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-green-600 rounded-full">
                          <Image
                            src="/bg-r-2.jpg"
                            alt="image4"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">After</div>
                    <div className="aspect-square bg-white border-2 border-dashed border-gray-300 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-green-600 rounded-full">
                          <Image
                            src="/bg-r-1.jpg"
                            alt="image4"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {currentSlide === 3 && (
                <div className="space-y-4 w-full">
                  <div className="aspect-video bg-gradient-to-br from-yellow-200 to-red-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl flex flex-col text-center">
                      <div className='text-[80px]'>
                        🎙️
                      </div>
                      <div className='font-bold text-black'>
                        Transcribe
                      </div>
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Articles Generated Daily</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-800 mb-1">2M+</div>
              <div className="text-sm text-gray-600">Images Processed</div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              <Star className="w-4 h-4 fill-black" />
              4.9
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Read Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
