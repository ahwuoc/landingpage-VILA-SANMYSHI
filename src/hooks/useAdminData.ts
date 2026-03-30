"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useUsers() {
  const [users, setUsers] = useState<{ id: number; full_name: string; email: string }[]>([]);

  useEffect(() => {
    supabase
      .from("users")
      .select("id, full_name, email")
      .order("full_name")
      .then(({ data }) => setUsers(data || []));
  }, []);

  return users;
}

export function useNewsCategories() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    supabase
      .from("news_categories")
      .select("*")
      .order("name")
      .then(({ data }) => setCategories(data || []));
  }, []);

  return categories;
}

export function useServiceCategories() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    supabase
      .from("service_categories")
      .select("*")
      .order("name")
      .then(({ data }) => setCategories(data || []));
  }, []);

  return categories;
}

export function useTemplates(type: "news" | "reply" | "service") {
  const [templates, setTemplates] = useState<{ id: number; name: string; content: string }[]>([]);

  useEffect(() => {
    supabase
      .from("templates")
      .select("*")
      .eq("type", type)
      .order("name")
      .then(({ data }) => setTemplates(data || []));
  }, [type]);

  return templates;
}

export function useContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("contacts")
      .select("*")
      .order("date", { ascending: false })
      .then(({ data }) => {
        setContacts(data || []);
        setLoading(false);
      });
  }, []);

  return { contacts, loading, setContacts };
}

export function useUnreadContacts() {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchCount = () => {
    supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .eq("status", "new")
      .then(({ count }) => setUnreadCount(count || 0));
  };

  useEffect(() => {
    fetchCount();

    const channel = supabase
      .channel("contacts-unread")
      .on("postgres_changes", { event: "*", schema: "public", table: "contacts" }, fetchCount)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return unreadCount;
}

export function useDashboardStats() {
  const [stats, setStats] = useState({ services: 0, news: 0, contacts: 0, newContacts: 0, templates: 0 });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const [s, n, c, nc, t] = await Promise.all([
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("news").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("templates").select("*", { count: "exact", head: true }),
      ]);
      setStats({ services: s.count || 0, news: n.count || 0, contacts: c.count || 0, newContacts: nc.count || 0, templates: t.count || 0 });

      const [rc, rn, rs] = await Promise.all([
        supabase.from("contacts").select("id, name, created_at, subject").order("created_at", { ascending: false }).limit(3),
        supabase.from("news").select("id, title, created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("services").select("id, title, updated_at").order("updated_at", { ascending: false }).limit(3),
      ]);

      const activities = [
        ...(rc.data || []).map(i => ({ id: `contact-${i.id}`, type: "contact", title: `Tin nhắn mới từ: ${i.name}`, time: i.created_at, status: "Mới", color: "text-rose-500 bg-rose-500/10", icon: "mail" })),
        ...(rn.data || []).map(i => ({ id: `news-${i.id}`, type: "news", title: `Bài viết mới: ${i.title}`, time: i.created_at, status: "Đã đăng", color: "text-emerald-500 bg-emerald-500/10", icon: "newspaper" })),
        ...(rs.data || []).map(i => ({ id: `service-${i.id}`, type: "service", title: `Cập nhật dịch vụ: ${i.title}`, time: i.updated_at, status: "Cập nhật", color: "text-blue-500 bg-blue-500/10", icon: "inventory_2" })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

      setRecentActivities(activities);
      setLoading(false);
    }
    fetch();
  }, []);

  return { stats, recentActivities, loading };
}
