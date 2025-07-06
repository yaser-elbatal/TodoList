"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { transformData, calculateArithmeticMean } from "../utils/dataTransform"

export default function DataTransformScreen() {
  const [showOriginal, setShowOriginal] = useState(true)
  const [showTransformed, setShowTransformed] = useState(false)
  const [showMean, setShowMean] = useState(false)

  const originalData = [
    {
      first_name: "Stepha",
      last_name: "Quiddinton",
      username: "squiddinton0",
      power: "481",
      gender: "Female",
      birth_date: "07.10.1996",
    },
    {
      first_name: "Niki",
      last_name: "Benedick",
      username: "nbenedick1",
      power: "578",
      gender: "Female",
      birth_date: "24.09.1996",
    },
    {
      first_name: "Kenneth",
      username: "kbeavers2",
      power: "463",
      gender: "Male",
      birth_date: "18.10.1990",
    },
    {
      first_name: "Nissy",
      last_name: "Juggins",
      username: "njuggins3",
      power: "436",
      gender: "Female",
      birth_date: "09.01.2000",
    },
    {
      first_name: "Jaymee",
      last_name: "Dotterill",
      username: "jdotterill4",
      power: "687",
      gender: "Female",
      birth_date: "13.02.2000",
    },
    {
      first_name: "Shell",
      last_name: "Shawe",
      username: "sshawe5",
      power: "631",
      gender: "Female",
      birth_date: "08.06.1999",
    },
    {
      first_name: "Ham",
      username: "hruslinge6",
      power: "659",
      gender: "Male",
      birth_date: "01.03.1991",
    },
    {
      first_name: "Gabriell",
      last_name: "Lukins",
      username: "glukins7",
      power: "500",
      gender: "Female",
      birth_date: "25.11.1998",
    },
    {
      first_name: "Roddy",
      last_name: "Whates",
      username: "rwhates8",
      power: "609",
      gender: "Male",
      birth_date: "06.03.1993",
    },
    {
      first_name: "Iris",
      username: "ibolens9",
      power: "418",
      gender: "Female",
      birth_date: "13.04.1993",
    },
  ]

  const transformedData = transformData(originalData)
  const arithmeticMean = calculateArithmeticMean(originalData)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Data Transformation</Text>
          <Text style={styles.headerSubtitle}>JSON transformation and arithmetic mean calculation</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, showOriginal && styles.activeButton]}
            onPress={() => setShowOriginal(!showOriginal)}
          >
            <Text style={[styles.buttonText, showOriginal && styles.activeButtonText]}>Original Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, showTransformed && styles.activeButton]}
            onPress={() => setShowTransformed(!showTransformed)}
          >
            <Text style={[styles.buttonText, showTransformed && styles.activeButtonText]}>Transformed Data</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, showMean && styles.activeButton]}
            onPress={() => setShowMean(!showMean)}
          >
            <Text style={[styles.buttonText, showMean && styles.activeButtonText]}>Arithmetic Mean</Text>
          </TouchableOpacity>
        </View>

        {showOriginal && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Original JSON Data</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{JSON.stringify(originalData, null, 2)}</Text>
            </View>
          </View>
        )}

        {showTransformed && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transformed Data</Text>
            <Text style={styles.description}>
              Format: {"{fullName: string, username: string, power: number, birthDate: Date}"}
            </Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{JSON.stringify(transformedData, null, 2)}</Text>
            </View>
          </View>
        )}

        {showMean && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Arithmetic Mean of Power Values</Text>
            <View style={styles.meanContainer}>
              <Text style={styles.meanValue}>{arithmeticMean.toFixed(2)}</Text>
              <Text style={styles.meanDescription}>Calculated from {originalData.length} power values</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  activeButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  activeButtonText: {
    color: "#fff",
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    fontStyle: "italic",
  },
  codeContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    padding: 16,
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#fff",
    lineHeight: 18,
  },
  meanContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  meanValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
  },
  meanDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
})
