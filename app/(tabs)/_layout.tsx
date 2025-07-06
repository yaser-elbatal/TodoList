import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Posts",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="data-transform"
        options={{
          title: "Data Transform",
          tabBarIcon: ({ color, size }) => <Ionicons name="code" size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}
