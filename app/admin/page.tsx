"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zucviqweznzmzzzuhxfg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our data
type PolicySource = {
  id: string
  url: string
  title: string | null
  status: 'pending' | 'processed' | 'failed'
  discovered_at: string
  processed_at: string | null
  created_at: string
  updated_at: string
}

type PolicyDetail = {
  id: string
  source_url: string
  plan_name: string | null
  sum_insured: string | null
  premium: string | null
  entry_age: string | null
  waiting_period: string | null
  key_features: string[] | null
  exclusions: string[] | null
  processed_at: string | null
  created_at: string
  updated_at: string
  insurance_company_name: string | null
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [policySourcesLoading, setPolicySourcesLoading] = useState(true)
  const [policyDetailsLoading, setPolicyDetailsLoading] = useState(true)
  const [policySources, setPolicySources] = useState<PolicySource[]>([])
  const [policyDetails, setPolicyDetails] = useState<PolicyDetail[]>([])
  const [activeTab, setActiveTab] = useState("policy-source")

  // Fetch policy sources on mount
  useEffect(() => {
    fetchPolicySources()
  }, [])

  // Fetch policy details when switching to policy details tab
  useEffect(() => {
    if (activeTab === "policy-details") {
      fetchPolicyDetails()
    }
  }, [activeTab])

  const fetchPolicySources = async () => {
    setPolicySourcesLoading(true)
    try {
      const { data, error } = await supabase
        .from('policy_sources')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setPolicySources(data || [])
    } catch (error) {
      console.error('Error fetching policy sources:', error)
      toast.error('Failed to load policy sources')
    } finally {
      setPolicySourcesLoading(false)
    }
  }

  const fetchPolicyDetails = async () => {
    setPolicyDetailsLoading(true)
    try {
      const { data, error } = await supabase
        .from('policy_details')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setPolicyDetails(data || [])
    } catch (error) {
      console.error('Error fetching policy details:', error)
      toast.error('Failed to load policy details')
    } finally {
      setPolicyDetailsLoading(false)
    }
  }

  const handleRefreshKB = async () => {
    setIsLoading(true)
    try {
      // Here you would add the API call to refresh the policy KB
      // For example: await fetch('/api/refresh-policy-kb')
      
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Refresh the data after successful KB update
      await fetchPolicySources()
      if (activeTab === "policy-details") {
        await fetchPolicyDetails()
      }
      
      toast.success("Policy Knowledge Base refreshed successfully")
    } catch (error) {
      console.error("Error refreshing policy KB:", error)
      toast.error("Failed to refresh Policy Knowledge Base")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="p-6 bg-card rounded-lg border shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Knowledge Base Management</h2>
          <p className="text-muted-foreground mb-4">
            Update the system's policy knowledge base with the latest information.
          </p>
          <Button 
            onClick={handleRefreshKB} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Refreshing..." : "Refresh Policy KB"}
          </Button>
        </div>

        <Tabs defaultValue="policy-source" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="policy-source">Policy Source</TabsTrigger>
            <TabsTrigger value="policy-details">Policy Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="policy-source" className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Policy Sources</h2>
            {policySourcesLoading ? (
              <div className="text-center py-8">Loading policy sources...</div>
            ) : policySources.length === 0 ? (
              <div className="text-center py-8">No policy sources found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Discovered</TableHead>
                      <TableHead>Processed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policySources.map((source) => (
                      <TableRow key={source.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {source.url}
                          </a>
                        </TableCell>
                        <TableCell>{source.title || 'N/A'}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            source.status === 'processed' ? 'bg-green-100 text-green-800' : 
                            source.status === 'failed' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {source.status}
                          </span>
                        </TableCell>
                        <TableCell>{formatDate(source.discovered_at)}</TableCell>
                        <TableCell>{formatDate(source.processed_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="policy-details" className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Policy Details</h2>
            {policyDetailsLoading ? (
              <div className="text-center py-8">Loading policy details...</div>
            ) : policyDetails.length === 0 ? (
              <div className="text-center py-8">No policy details found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Sum Insured</TableHead>
                      <TableHead>Premium</TableHead>
                      <TableHead>Entry Age</TableHead>
                      <TableHead>Waiting Period</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policyDetails.map((detail) => (
                      <TableRow key={detail.id}>
                        <TableCell className="font-medium">{detail.insurance_company_name || 'N/A'}</TableCell>
                        <TableCell>{detail.plan_name || 'N/A'}</TableCell>
                        <TableCell>{detail.sum_insured || 'N/A'}</TableCell>
                        <TableCell>{detail.premium || 'N/A'}</TableCell>
                        <TableCell>{detail.entry_age || 'N/A'}</TableCell>
                        <TableCell>{detail.waiting_period || 'N/A'}</TableCell>
                        <TableCell className="max-w-[150px] truncate">
                          <a href={detail.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {detail.source_url}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
} 