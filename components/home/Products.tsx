import { ArrowUpRight } from 'lucide-react';

export default function Products() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="mb-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-lg text-gray-700 leading-tight mb-3">Our Products</div>
            <h2 className="text-5xl font-normal leading-tight text-black">
              Explore Our Toolkit: The Best of AI Content Creation.
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-tight max-w-md">
            A suite of tools designed for marketers, creators, and e-commerce businesses to scale their content effortlessly.
          </p>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-auto">
                <div className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-medium leading-tight">Instant Background Remover</span>
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <a href='/dashboard/remove-background' >
                <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="space-y-4 w-full">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="aspect-square bg-white border-2 border-dashed border-gray-300 rounded-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-medium leading-tight">AI Article Writer</span>
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <a href='/dashboard/article-writer'>
                <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full space-y-2">
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                <div className="h-2 bg-gray-300 rounded w-full"></div>
                <div className="h-2 bg-gray-400 rounded w-2/3"></div>
                <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1  md:row-span-1 bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-medium leading-tight">Text-to-Image</span>
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <a href='/dashboard/image-generator' >
                <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="grid-cols-2 gap-2 w-full flex flex-col">
                <div className="aspect-square bg-gradient-to-br from-pink-200 to-purple-200 rounded-lg"></div>
                <div className="aspect-square bg-gradient-to-br from-blue-200 to-teal-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>


        <div className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-medium leading-tight">Title Writer AI</span>
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <a href='/dashboard/title-writer' >
                <ArrowUpRight className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center py-8">
              <div className="space-y-8 w-full">
                <div className="aspect-square bg-gradient-to-br from-amber-200 to-yellow-200 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-2 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-2 bg-black rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="text-lg font-medium leading-tight">Social Media Kit</span>
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-3 w-full">
                <div className="aspect-square bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg"></div>
                <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg"></div>
                <div className="aspect-square bg-gradient-to-br from-teal-200 to-green-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
