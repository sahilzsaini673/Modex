"use client"
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function FeatureGateway() {
  const [activeFeature, setActiveFeature] = useState('background-remover');

  const features = [
    { id: 'article-writer', name: 'AI Article Writer', color: 'from-blue-100 to-purple-100' },
    { id: 'image-generator', name: 'AI Image Generator', color: 'from-pink-100 to-orange-100' },
    { id: 'background-remover', name: 'Background Remover', color: 'from-green-100 to-teal-100' },
  ];

  return (
    <section id='products' className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div>
            <div className="text-sm uppercase tracking-wide text-black mb-4 font-normal leading-tight">
              MODEX CORE
            </div>
            <h2 className="text-5xl font-light leading-tight text-black mb-6">
              Unlock Infinite Creativity with Our Generative Engine
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              From social media campaigns to full blog posts and product photography, our AI handles the heavy lifting, giving you back time to focus on strategy.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all ${
                  activeFeature === feature.id
                    ? 'bg-gray-400 text-white font-bold'
                    : 'bg-white text-black font-normal hover:bg-gray-50'
                } border border-gray-200`}
              >
                <span className="leading-tight">{feature.name}</span>
                {activeFeature === feature.id && <ArrowRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className={`rounded-2xl shadow-2xl p-8 transition-all duration-500 hover:scale-105 bg-gradient-to-br ${
              features.find((f) => f.id === activeFeature)?.color
            }`}
          >
            <div className="bg-white rounded-xl p-8 min-h-[400px] flex flex-col justify-center">
              {activeFeature === 'article-writer' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              )}
              {activeFeature === 'image-generator' && (
                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder="Describe your image..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg">
                      <Image src='/ig-1.jpg' fill className='object-cover rounded-lg' alt='id-1' />
                    </div>
                    <div className="aspect-square bg-gradient-to-br from-blue-200 to-teal-200 rounded-lg">
                      <Image src='/ig-2.jpg' fill className='object-cover rounded-lg' alt='id-1' />
                    </div>
                  </div>
                </div>
              )}
              {activeFeature === 'background-remover' && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">Before</div>
                    <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-blue-600 rounded-full">
                          <Image src='/w-1.avif' fill className='object-cover rounded-lg' alt='id-1' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">After</div>
                    <div className="aspect-square bg-white border-2 border-dashed border-gray-300 rounded-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-blue-600 rounded-full">
                          <Image src='/w-2.jpg' fill className='object-cover rounded-lg' alt='id-1' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
