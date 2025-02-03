import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"


export const MemberSidebar = () => {
    return (

        <div className="w-64 flex-shrink-0">
            <h2 className="text-lg font-semibold mb-4">Collaborators 1/10</h2>
            <nav className="space-y-1">
                <a href="#" className="flex items-center justify-between px-3 py-2 bg-blue-50 text-blue-600 rounded-md">
                    Workspace members (1)
                </a>
                <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                    Guests (0)
                </a>
                <a href="#" className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                    Join requests (0)
                </a>
            </nav>

            {/* Upgrade Card */}
            <Card className="mt-6 bg-purple-600 text-white p-4">
                <h3 className="font-semibold mb-2">Upgrade for more permissions controls</h3>
                <p className="text-sm mb-4">
                    Decide who can send invitations, edit Workspace settings, and more with Premium.
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                    Try Premium free for 14 days
                </Button>
            </Card>
        </div>

    )
}