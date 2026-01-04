import React from 'react'

const Page = () => {
  return (
    <div className="min-h-screen p-8 space-y-4 max-h-[]:opacity-50">
      {/* Test Box 1 - Changes height based on viewport height */}
      <div className="
        h-32 
        h-md:h-48 
        h-lg:h-64 
        bg-blue-500 
        h-md:bg-green-500 
        h-lg:bg-purple-500
        flex items-center justify-center
        text-white font-bold
        rounded-lg
      ">
        Height Changes: 
        <span className="ml-2">
          Blue (default) → Green (h ≥ 768px) → Purple (h ≥ 900px)
        </span>
      </div>

      {/* Test Box 2 - Different height variations */}
      <div className="
        h-24
        h-md:h-40
        h-lg:h-56
        h-xl:h-72
        bg-red-400
        h-md:bg-orange-400
        h-lg:bg-yellow-400
        h-xl:bg-pink-400
        flex items-center justify-center
        text-white font-bold
        rounded-lg
      ">
        Multi-level: Red → Orange → Yellow → Pink
      </div>

      {/* Test Box 3 - Padding and text size changes */}
      <div className="
        h-20
        h-md:h-32
        h-lg:h-44
        bg-gradient-to-r from-cyan-500 to-blue-500
        h-md:from-emerald-500 h-md:to-green-500
        h-lg:from-violet-500 h-lg:to-purple-500
        flex items-center justify-center
        text-white
        text-sm h-md:text-lg h-lg:text-2xl
        rounded-lg
      ">
        Gradient + Text Size Changes
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">How to Test:</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Resize your browser window vertically (change height)</li>
          <li>Watch the colors change at different viewport heights:</li>
          <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
            <li><strong>Default:</strong> Initial colors (viewport height &lt; 768px)</li>
            <li><strong>h-md:</strong> Changes at 768px height</li>
            <li><strong>h-lg:</strong> Changes at 900px height</li>
            <li><strong>h-xl:</strong> Changes at 1080px height</li>
          </ul>
        </ol>
        
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <p className="text-sm">
            <strong>Note:</strong> Make sure you've added the height breakpoints to your 
            <code className="bg-gray-200 px-1 rounded mx-1">globals.css</code> 
            file using the @variant approach for Tailwind v4.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page