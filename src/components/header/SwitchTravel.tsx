import { useEffect, useState } from "react"
import { useNavigate, useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Plane, Building2 } from 'lucide-react'
import { TextureButton } from "~/components/ui/texture-button"

export default function SwitchTravel() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  
  // Determine current tab based on pathname
  const getCurrentTab = () => {
    return location.pathname.includes('/flights') ? 'flights' : 'hotels'
  }
  
  const [selectedValue, setSelectedValue] = useState(getCurrentTab())

  // Update selected value when pathname changes
  useEffect(() => {
    setSelectedValue(getCurrentTab())
  }, [location.pathname])

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
    
    // Navigate to the appropriate route
    if (value === 'flights') {
      navigate({
        to: '/$locale/flights',
        params: { locale: 'en' }
      })
    } else {
      navigate({
        to: '/$locale/hotels',
        params: { locale: 'en' }
      })
    }
  }

  return (
    <div className="flex gap-1">
      <TextureButton
        variant={selectedValue === 'hotels' ? 'primary' : 'minimal'}
        size="sm"
        onClick={() => handleValueChange('hotels')}
        className="min-w-[80px] md:min-w-[100px]"
      >
        <Building2 className="w-4 h-4" />
        <span className="hidden sm:inline">{t('hotels')}</span>
        <span className="sm:hidden">Hotels</span>
      </TextureButton>
      
      <TextureButton
        variant={selectedValue === 'flights' ? 'accent' : 'minimal'}
        size="sm"
        onClick={() => handleValueChange('flights')}
        className="min-w-[80px] md:min-w-[100px]"
      >
        <Plane className="w-4 h-4" />
        <span className="hidden sm:inline">{t('flights')}</span>
        <span className="sm:hidden">Flights</span>
      </TextureButton>
    </div>
  )
}
