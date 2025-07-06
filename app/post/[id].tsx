"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, SafeAreaView } from "react-native"
import { useLocalSearchParams } from "expo-router"
import type { Post, User } from "../types"

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPostAndUser(Number.parseInt(id))
    }
  }, [id])

  const fetchPostAndUser = async (postId: number) => {
    try {
      setLoading(true)

      // Fetch post details
      const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      const postData = await postResponse.json() // Corrected variable name
      setPost(postData)

      // Fetch user details
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
      const userData = await userResponse.json()
      setUser(userData)
    } catch (error) {
      Alert.alert("Error", "Failed to fetch post details")
      console.error("Error fetching post details:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading post details...</Text>
      </View>
    )
  }

  if (!post || !user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Post Information */}
        <View style={styles.postSection}>
          <View style={styles.postHeader}>
            <Text style={styles.postId}>Post #{post.id}</Text>
          </View>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>

        {/* User Information */}
        <View style={styles.userSection}>
          <Text style={styles.sectionTitle}>Author Information</Text>
          <View style={styles.userCard}>
            <View style={styles.userHeader}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userUsername}>@{user.username}</Text>
            </View>

            <View style={styles.userDetails}>
              <View style={styles.userDetailRow}>
                <Text style={styles.userDetailLabel}>Email:</Text>
                <Text style={styles.userDetailValue}>{user.email}</Text>
              </View>

              <View style={styles.userDetailRow}>
                <Text style={styles.userDetailLabel}>Phone:</Text>
                <Text style={styles.userDetailValue}>{user.phone}</Text>
              </View>

              <View style={styles.userDetailRow}>
                <Text style={styles.userDetailLabel}>Website:</Text>
                <Text style={styles.userDetailValue}>{user.website}</Text>
              </View>

              <View style={styles.userDetailRow}>
                <Text style={styles.userDetailLabel}>Company:</Text>
                <Text style={styles.userDetailValue}>{user.company.name}</Text>
              </View>

              <View style={styles.userDetailRow}>
                <Text style={styles.userDetailLabel}>Address:</Text>
                <Text style={styles.userDetailValue}>
                  {user.address.street}, {user.address.suite}
                  {"\n"}
                  {user.address.city}, {user.address.zipcode}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "#ff3333",
  },
  postSection: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    marginBottom: 12,
  },
  postId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
  postTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textTransform: "capitalize",
  },
  postBody: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  userSection: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  userUsername: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 4,
  },
  userDetails: {
    gap: 12,
  },
  userDetailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userDetailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    width: 80,
  },
  userDetailValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
})
