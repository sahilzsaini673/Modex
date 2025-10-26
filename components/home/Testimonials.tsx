import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="text-sm text-gray-500 mb-4">Trusted by Top Creators</div>
          <h2 className="text-5xl font-medium leading-tight text-black">
            Cognito AI: Scaling Excellence Through Client Success.
          </h2>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-medium text-black mb-1">Sarah Chen</div>
                <div className="text-sm text-gray-600">Head of Content, EcomFlow</div>
              </div>
              <div className="ml-auto flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">5.0</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              "Cognito AI has transformed how we create content. What used to take our team days now takes hours. The quality is consistently excellent, and our productivity has doubled."
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex-shrink-0"></div>
              <div>
                <div className="font-medium text-black mb-1">Marcus Rodriguez</div>
                <div className="text-sm text-gray-600">Creative Director, BrandLab</div>
              </div>
              <div className="ml-auto flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">4.9</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              "The image generation and background removal tools are game-changers for our e-commerce clients. We've cut production time by 70% while maintaining premium quality."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
