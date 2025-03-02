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
  const fakeSearchQueries = [
    {
      id: "1",
      createdAt: new Date("2024-03-02T10:00:00Z"),
      userId: "user_123",
      queryText: "how to become a millionaire overnight",
    },
    {
      id: "2",
      createdAt: new Date("2024-03-02T10:05:00Z"),
      userId: "user_123",
      queryText: "is water wet",
    },
    {
      id: "3",
      createdAt: new Date("2024-03-02T10:10:00Z"),
      userId: "user_456",
      queryText: "why does my code not work",
    },
    {
      id: "4",
      createdAt: new Date("2024-03-02T10:15:00Z"),
      userId: "user_789",
      queryText: "free ways to get rich fast",
    },
    {
      id: "5",
      createdAt: new Date("2024-03-02T10:20:00Z"),
      userId: "user_456",
      queryText: "how to hack NASA from my fridge",
    },
    {
      id: "6",
      createdAt: new Date("2024-03-02T10:25:00Z"),
      userId: "user_789",
      queryText: "what happens if you microwave a spoon",
    },
    {
      id: "7",
      createdAt: new Date("2024-03-02T10:30:00Z"),
      userId: "user_123",
      queryText: "why do I hear boss music when coding",
    },
    {
      id: "8",
      createdAt: new Date("2024-03-02T10:35:00Z"),
      userId: "user_456",
      queryText: "best hiding spots if I don’t do my assignments",
    },
    {
      id: "9",
      createdAt: new Date("2024-03-02T10:40:00Z"),
      userId: "user_789",
      queryText: "can I sell my soul for WiFi speed",
    },
    {
      id: "10",
      createdAt: new Date("2024-03-02T10:45:00Z"),
      userId: "user_123",
      queryText: "does pineapple belong on pizza",
    },
  ];

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
