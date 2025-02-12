import { managerAuth } from '@/app/actions/manager-auth'
import { auth } from '@/lib/auth'
import { TrendingUp } from 'lucide-react'
import { PortalButton } from './portal-button'

export async function TotalVisits({
  totalVisits = 0,
  showPortalButton = false,
}: { totalVisits?: number; showPortalButton?: boolean }) {
  const session = await auth()

  return (
    <div className="w-min whitespace-nowrap flex items-center gap-5 bg-background-secondary border border-border-primary px-8 py-3 rounded-xl shadow-lg">
      <span className="font-bold text-white">Total de visitas</span>

      <div className="flex items-center gap-2 text-accent-green">
        <span className="text-3xl font-bold">{totalVisits}</span>

        <TrendingUp />
      </div>

      {showPortalButton && (
        <div className="gap-2 flex items-center">
          {session?.user.isSubscribed && <PortalButton />}

          <form action={managerAuth}>
            <button type="submit">Sair</button>
          </form>
        </div>
      )}
    </div>
  )
}
