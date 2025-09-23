"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
  faArrowLeft, 
  faPlus, 
  faSearch, 
  faMessage,
  faHome
} from "@fortawesome/free-solid-svg-icons"
import { NavUser } from "./NavUser"
import { Input } from "./ui/input"
import { useState, useEffect, useCallback } from "react"
import conversationServices from "@/services/conversationServices"
import type { ConversationRequest, ConversationResponse } from "@/types/conversation"
import { Info, Loader2, Plus } from "lucide-react"
import useNotification from "@/hooks/useNotification"
import Notification from "./Notification"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [searchConversation, setSearchConversation] = useState("");
    const [conversationList, setConversationList] = useState<ConversationResponse[]>([]);
    const [filteredConversation, setFilteredConversation] = useState<ConversationResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreatingConversation, setIsCreatingConversation] = useState(false);
    const { notification, showNotification, hideNotification } = useNotification();
    const { state: sidebarState } = useSidebar();
    const navigate = useNavigate();
    const location = useLocation();

    const isCollapsed = sidebarState === "collapsed";

    const currentConversationId = React.useMemo(() => {
        const match = location.pathname.match(/\/conversation\/(\d+)/);
        return match ? parseInt(match[1], 10) : null;
    }, [location.pathname]);

    useEffect(() => {
        fetchAllConversations();
    }, []);

    useEffect(() => {
        handleSearchConversation(searchConversation);
    }, [searchConversation, conversationList]);
        
    const fetchAllConversations = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await conversationServices.getUserConversation();
            const conversations = Array.isArray(data) ? data : (data ? [data] : []);
            setConversationList(conversations);
            setFilteredConversation(conversations);
            console.log("Successfully fetch all user conversations");
        } catch (error: any) {
            console.error("Failed to fetch conversations:", error);
            showNotification(
                error?.response?.data?.message || "Failed to fetch conversations", 
                "error"
            );
            setConversationList([]);
            setFilteredConversation([]);
        } finally {
            setIsLoading(false);
        }
    }, [showNotification]);

    const handleSearchConversation = useCallback((term: string) => {
        if (!term.trim()) {
            setFilteredConversation(conversationList);
            return;
        }

        const filterSearchConversation = conversationList.filter((conversation) => 
            conversation.name.toLowerCase().includes(term.toLowerCase())
        );

        setFilteredConversation(filterSearchConversation);
    }, [conversationList]);

    const handleConversationClick = useCallback((conversationId: number) => {
        navigate(`/conversation/${conversationId}/messages`);
    }, [navigate]);

    const handleNewConversation = useCallback(async () => {
        setIsCreatingConversation(true);
        try {
            const timestamp = new Date().toLocaleString();
            const response: ConversationRequest = {
                title: `Doctor AI Conversation - ${timestamp}`
            };
            const data = await conversationServices.createConversation(response);
            setConversationList((prev) => [data, ...prev]);
            setFilteredConversation((prev) => [data, ...prev]);

            navigate(`/conversation/${data.conversationId}/messages`);
            showNotification("New conversation created!", "success");
            console.log("Successfully created new conversation");
        } catch (error: any) {
            console.error("Failed to create conversation:", error?.response?.data?.message || "Failed to create conversation");
            showNotification(
                error?.response?.data?.message || "Failed to create conversation",
                "error"
            );
        } finally {
            setIsCreatingConversation(false);
        }
    }, [navigate, showNotification]);

    const handleClearSearch = useCallback(() => {
        setSearchConversation("");
    }, []);

    return (
        <TooltipProvider>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-center p-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link 
                                        to="/" 
                                        className="text-blue-600 hover:text-blue-700 transition-all duration-200 p-2 rounded-lg hover:bg-blue-100 group"
                                        aria-label="Go back to home"
                                    >
                                        <FontAwesomeIcon 
                                            icon={isCollapsed ? faHome : faArrowLeft}
                                            className="text-base group-hover:transform group-hover:scale-110 transition-transform duration-200" 
                                        />
                                    </Link>
                                </TooltipTrigger>
                                {isCollapsed && (
                                    <TooltipContent side="right">
                                        <p>Go to Home</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    
                    {!isCollapsed && (
                        <div className="flex flex-col justify-center gap-4 p-4 animate-in fade-in duration-200">
                            <div className="flex flex-col space-y-1">
                                <h1 className="font-bold text-xl text-blue-600 leading-tight">
                                    AldebaranHealth
                                </h1>
                                <p className="font-medium text-sm text-gray-600">
                                    Your AI Virtual Assistant
                                </p>
                            </div>
                            
                            <div className="relative group">
                                <FontAwesomeIcon 
                                    icon={faSearch} 
                                    className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-blue-500 transition-colors duration-200"
                                />
                                <Input
                                    id="searchTerm"
                                    name="searchTerm"
                                    type="text"
                                    placeholder="Search conversations..."
                                    value={searchConversation}
                                    onChange={(e) => setSearchConversation(e.target.value)}
                                    className="pl-10 pr-10 py-2.5 text-sm border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg transition-all duration-200"
                                    disabled={isLoading}
                                />
                                {searchConversation && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-lg leading-none"
                                        aria-label="Clear search"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                            
                            <Button
                                onClick={handleNewConversation}
                                disabled={isCreatingConversation}
                                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isCreatingConversation ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-sm">Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faPlus} className="text-sm" />
                                        <span className="text-sm">New Conversation</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    )}

                    {isCollapsed && (
                        <div className="flex flex-col items-center p-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={handleNewConversation}
                                        disabled={isCreatingConversation}
                                        size="sm"
                                        className="w-10 h-10 p-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        {isCreatingConversation ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Plus className="h-4 w-4" />
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>New Conversation</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}
                </SidebarHeader>
                
                <SidebarContent className="flex-1 overflow-hidden">
                    {!isCollapsed && (
                        <div className="px-4 py-2">
                            <SidebarGroupLabel className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <FontAwesomeIcon icon={faMessage} className="text-blue-500" />
                                All Conversations
                                {filteredConversation.length > 0 && (
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        {filteredConversation.length}
                                    </span>
                                )}
                            </SidebarGroupLabel>
                        </div>
                    )}
                    
                    <SidebarGroupContent className="flex-1 overflow-y-auto px-2">
                        <SidebarMenu className="space-y-1">
                            {isLoading && filteredConversation.length === 0 ? (
                                <div className={`flex items-center justify-center gap-2 p-4 text-gray-500 ${isCollapsed ? 'flex-col' : ''}`}>
                                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                    {!isCollapsed && <span className="text-sm">Loading...</span>}
                                </div>
                            ) : filteredConversation.length === 0 ? (
                                <div className={`flex flex-col items-center justify-center gap-2 p-4 text-center ${isCollapsed ? 'px-2' : 'px-6'}`}>
                                    <div className="p-2 bg-gray-100 rounded-full">
                                        <Info className="h-4 w-4 text-gray-400" />
                                    </div>
                                    {!isCollapsed && (
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-600">
                                                {searchConversation 
                                                    ? `No results for "${searchConversation}"` 
                                                    : "No conversations yet"
                                                }
                                            </p>
                                            {!searchConversation && (
                                                <p className="text-xs text-gray-400">
                                                    Start a new conversation above
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                filteredConversation.map((conversation) => {
                                    const isActive = currentConversationId === conversation.conversationId;
                                    
                                    return (
                                        <SidebarMenuItem key={conversation.conversationId}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <SidebarMenuButton
                                                        onClick={() => handleConversationClick(conversation.conversationId)}
                                                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                                                            isActive 
                                                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500 shadow-sm' 
                                                                : 'hover:bg-gray-50 hover:text-blue-600'
                                                        }`}
                                                        isActive={isActive}
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <FontAwesomeIcon 
                                                                icon={faMessage} 
                                                                className={`text-sm flex-shrink-0 ${
                                                                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'
                                                                } transition-colors duration-200`}
                                                            />
                                                            {!isCollapsed && (
                                                                <span className="truncate text-sm font-medium">
                                                                    {conversation.name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SidebarMenuButton>
                                                </TooltipTrigger>
                                                {isCollapsed && (
                                                    <TooltipContent side="right">
                                                        <p className="max-w-xs truncate">{conversation.name}</p>
                                                    </TooltipContent>
                                                )}
                                            </Tooltip>
                                        </SidebarMenuItem>
                                    );
                                })
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarContent>
                
                <SidebarFooter className="border-t bg-white/80 backdrop-blur-sm">
                    <NavUser />
                </SidebarFooter>
                
                <SidebarRail />
            </Sidebar>
            
            {/* Notification component positioned outside sidebar */}
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
                duration={3000}
                position="top-center"
            />
        </TooltipProvider>
    );
}