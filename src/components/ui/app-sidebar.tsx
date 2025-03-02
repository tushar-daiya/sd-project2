import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "./button";

export async function AppSidebar() {
  const searchResults = await prisma.searchQuery.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  console.log(searchResults);

  return (
    <Sidebar>
      <SidebarContent className="p-4 flex flex-col justify-between">
        <div>
          <SidebarHeader>
            <h1 className="text-2xl font-bold">Search History</h1>
          </SidebarHeader>
          <div className="flex flex-col space-y-4">
            {searchResults.map((result) => (
              <div
                key={result.id}
                className="flex flex-col space-y-2 overflow-x-hidden"
              >
                <p className="text-lg text-nowrap">{result.queryText}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="w-full " type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
