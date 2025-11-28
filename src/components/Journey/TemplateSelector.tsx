import React, { useState } from 'react';
import { X } from 'lucide-react';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import {
  SHOOT_SIDES_TEMPLATES,
  TEMPLATE_CATEGORIES,
  getTemplatesByCategory,
  getTemplatesBySubcategory,
  type ShootSideTemplate
} from '../../constants/shootSidesTemplates';

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: ShootSideTemplate) => void;
  currentCategory?: 'exterior' | 'interior' | 'additional';
}

export default function TemplateSelector({
  isOpen,
  onClose,
  onSelect,
  currentCategory = 'exterior'
}: TemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<'exterior' | 'interior' | 'additional'>(currentCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get templates to display
  const getFilteredTemplates = () => {
    let templates = getTemplatesByCategory(selectedCategory);

    // Filter by subcategory if selected
    if (selectedSubcategory) {
      templates = templates.filter(t => t.subcategory === selectedSubcategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      templates = templates.filter(t =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
      );
    }

    return templates;
  };

  const handleSelect = (template: ShootSideTemplate) => {
    onSelect(template);
    onClose();
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Select Template"
      size="xl"
    >
      <div className="space-y-4">
        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {(Object.keys(TEMPLATE_CATEGORIES) as Array<keyof typeof TEMPLATE_CATEGORIES>).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedSubcategory(null);
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedCategory === category
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {TEMPLATE_CATEGORIES[category].label}
              </button>
            ))}
          </nav>
        </div>

        {/* Subcategory Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedSubcategory === null
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {TEMPLATE_CATEGORIES[selectedCategory].subcategories.map((subcategory) => (
            <button
              key={subcategory}
              onClick={() => setSelectedSubcategory(subcategory)}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                selectedSubcategory === subcategory
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {subcategory}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto py-2">
          {filteredTemplates.length === 0 ? (
            <div className="col-span-4 text-center py-8 text-gray-500">
              No templates found
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelect(template)}
                className="group relative bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-lg transition-all"
              >
                {/* Template Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img
                    src={template.thumbUrl}
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>';
                      }
                    }}
                  />
                </div>

                {/* Template Name */}
                <div className="text-xs font-medium text-gray-900 truncate">
                  {template.name}
                </div>

                {/* Angle Badge */}
                {template.angle !== undefined && (
                  <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    #{template.angle}
                  </div>
                )}

                {/* Hover Overlay with Description */}
                <div className="absolute inset-0 bg-black bg-opacity-75 text-white p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center">
                  <div className="text-sm font-medium mb-1">{template.name}</div>
                  <div className="text-xs text-gray-300">{template.description}</div>
                  {template.angle !== undefined && (
                    <div className="mt-2 text-xs">Angle: {template.angle}</div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
          </div>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
