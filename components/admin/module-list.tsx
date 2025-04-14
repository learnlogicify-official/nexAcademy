"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Plus, ChevronDown, ChevronRight, Pencil, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Module {
  id: string;
  title: string;
  order: number;
  courseId: string;
  submodules: Submodule[];
}

interface Submodule {
  id: string;
  title: string;
  order: number;
  moduleId: string;
}

interface ModuleListProps {
  courseId: string;
  modules: Module[];
  onModuleUpdate: () => void;
}

interface SortableModuleItemProps {
  module: Module;
  expandedModules: Set<string>;
  expandedSubmodules: Set<string>;
  editingModuleId: string | null;
  editingModuleTitle: string;
  editingSubmoduleId: string | null;
  editingSubmoduleTitle: string;
  isDeleting: { type: 'module' | 'submodule'; id: string } | null;
  onToggleModule: (moduleId: string) => void;
  onToggleSubmodule: (submoduleId: string) => void;
  onStartEditing: (moduleId: string, currentTitle: string) => void;
  onStartEditingSubmodule: (submoduleId: string, currentTitle: string) => void;
  onModuleEdit: (moduleId: string) => void;
  onSubmoduleEdit: (submoduleId: string) => void;
  onModuleDelete: (moduleId: string) => void;
  onSubmoduleDelete: (submoduleId: string) => void;
  onModuleTitleChange: (value: string) => void;
  onSubmoduleTitleChange: (value: string) => void;
  onAddSubmodule: (moduleId: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, moduleId: string) => void;
  onSubmoduleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, submoduleId: string) => void;
  setIsDeleting: (value: { type: 'module' | 'submodule'; id: string } | null) => void;
}

function SortableModuleItem({
  module,
  expandedModules,
  expandedSubmodules,
  editingModuleId,
  editingModuleTitle,
  editingSubmoduleId,
  editingSubmoduleTitle,
  isDeleting,
  onToggleModule,
  onToggleSubmodule,
  onStartEditing,
  onStartEditingSubmodule,
  onModuleEdit,
  onSubmoduleEdit,
  onModuleDelete,
  onSubmoduleDelete,
  onModuleTitleChange,
  onSubmoduleTitleChange,
  onAddSubmodule,
  onKeyPress,
  onSubmoduleKeyPress,
  setIsDeleting,
}: SortableModuleItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Card ref={setNodeRef} style={style} className={cn(isDragging && "opacity-50")}>
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto cursor-grab"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-auto"
              onClick={() => onToggleModule(module.id)}
            >
              {expandedModules.has(module.id) ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            {editingModuleId === module.id ? (
              <Input
                value={editingModuleTitle}
                onChange={(e) => onModuleTitleChange(e.target.value)}
                onKeyDown={(e) => onKeyPress(e, module.id)}
                onBlur={() => onModuleEdit(module.id)}
                className="h-8 w-[200px]"
                autoFocus
              />
            ) : (
              <>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <div className="flex items-center gap-2 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto"
                    onClick={() => onStartEditing(module.id, module.title)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog open={isDeleting?.type === 'module' && isDeleting.id === module.id}>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-auto text-destructive"
                        onClick={() => setIsDeleting({ type: 'module', id: module.id })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Module</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this module? This action cannot be undone.
                          All submodules within this module will also be deleted.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDeleting(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            onModuleDelete(module.id);
                            setIsDeleting(null);
                          }}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      {expandedModules.has(module.id) && (
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAddSubmodule(module.id)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Submodule
              </Button>
            </div>
            <div className="pl-6 space-y-2">
              {module.submodules.map((submodule) => (
                <div
                  key={submodule.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto"
                      onClick={() => onToggleSubmodule(submodule.id)}
                    >
                      {expandedSubmodules.has(submodule.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    {editingSubmoduleId === submodule.id ? (
                      <Input
                        value={editingSubmoduleTitle}
                        onChange={(e) => onSubmoduleTitleChange(e.target.value)}
                        onKeyDown={(e) => onSubmoduleKeyPress(e, submodule.id)}
                        onBlur={() => onSubmoduleEdit(submodule.id)}
                        className="h-8 w-[200px]"
                        autoFocus
                      />
                    ) : (
                      <>
                        <span>{submodule.title}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                            onClick={() => onStartEditingSubmodule(submodule.id, submodule.title)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog open={isDeleting?.type === 'submodule' && isDeleting.id === submodule.id}>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto text-destructive"
                                onClick={() => setIsDeleting({ type: 'submodule', id: submodule.id })}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Submodule</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this submodule? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsDeleting(null)}>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    onSubmoduleDelete(submodule.id);
                                    setIsDeleting(null);
                                  }}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export function ModuleList({ courseId, modules, onModuleUpdate }: ModuleListProps) {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [expandedSubmodules, setExpandedSubmodules] = useState<Set<string>>(new Set());
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [editingSubmoduleId, setEditingSubmoduleId] = useState<string | null>(null);
  const [editingSubmoduleTitle, setEditingSubmoduleTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState<{ type: 'module' | 'submodule'; id: string } | null>(null);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const toggleSubmodule = (submoduleId: string) => {
    const newExpanded = new Set(expandedSubmodules);
    if (newExpanded.has(submoduleId)) {
      newExpanded.delete(submoduleId);
    } else {
      newExpanded.add(submoduleId);
    }
    setExpandedSubmodules(newExpanded);
  };

  const handleAddModule = async () => {
    try {
      const defaultTitle = `New Module ${modules.length + 1}`;
      const response = await fetch("/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: defaultTitle,
          courseId,
          order: modules.length,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create module");
      }

      const newModule = await response.json();
      setExpandedModules(prev => new Set([...prev, newModule.id]));
      setEditingModuleId(newModule.id);
      setEditingModuleTitle(defaultTitle);
      
      toast({
        title: "Success",
        description: "Module created successfully",
      });

      onModuleUpdate();
    } catch (error) {
      console.error("Error creating module:", error);
      toast({
        title: "Error",
        description: "Failed to create module",
        variant: "destructive",
      });
    }
  };

  const handleAddSubmodule = async (moduleId: string) => {
    try {
      const module = modules.find(m => m.id === moduleId);
      if (!module) return;

      const defaultTitle = `New Submodule ${module.submodules.length + 1}`;
      const response = await fetch("/api/submodules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: defaultTitle,
          moduleId,
          order: module.submodules.length,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create submodule");
      }

      const newSubmodule = await response.json();
      setExpandedSubmodules(prev => new Set([...prev, newSubmodule.id]));
      setEditingSubmoduleId(newSubmodule.id);
      setEditingSubmoduleTitle(defaultTitle);

      toast({
        title: "Success",
        description: "Submodule created successfully",
      });

      onModuleUpdate();
    } catch (error) {
      console.error("Error creating submodule:", error);
      toast({
        title: "Error",
        description: "Failed to create submodule",
        variant: "destructive",
      });
    }
  };

  const handleModuleEdit = async (moduleId: string) => {
    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingModuleTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update module");
      }

      toast({
        title: "Success",
        description: "Module updated successfully",
      });

      setEditingModuleId(null);
      setEditingModuleTitle("");
      onModuleUpdate();
    } catch (error) {
      console.error("Error updating module:", error);
      toast({
        title: "Error",
        description: "Failed to update module",
        variant: "destructive",
      });
    }
  };

  const handleModuleDelete = async (moduleId: string) => {
    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete module");
      }

      toast({
        title: "Success",
        description: "Module deleted successfully",
      });

      onModuleUpdate();
    } catch (error) {
      console.error("Error deleting module:", error);
      toast({
        title: "Error",
        description: "Failed to delete module",
        variant: "destructive",
      });
    }
  };

  const handleSubmoduleDelete = async (submoduleId: string) => {
    try {
      const response = await fetch(`/api/submodules/${submoduleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete submodule");
      }

      toast({
        title: "Success",
        description: "Submodule deleted successfully",
      });

      onModuleUpdate();
    } catch (error) {
      console.error("Error deleting submodule:", error);
      toast({
        title: "Error",
        description: "Failed to delete submodule",
        variant: "destructive",
      });
    }
  };

  const handleSubmoduleEdit = async (submoduleId: string) => {
    try {
      const response = await fetch(`/api/submodules/${submoduleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editingSubmoduleTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update submodule");
      }

      toast({
        title: "Success",
        description: "Submodule updated successfully",
      });

      setEditingSubmoduleId(null);
      setEditingSubmoduleTitle("");
      onModuleUpdate();
    } catch (error) {
      console.error("Error updating submodule:", error);
      toast({
        title: "Error",
        description: "Failed to update submodule",
        variant: "destructive",
      });
    }
  };

  const startEditing = (moduleId: string, currentTitle: string) => {
    setEditingModuleId(moduleId);
    setEditingModuleTitle(currentTitle);
  };

  const startEditingSubmodule = (submoduleId: string, currentTitle: string) => {
    setEditingSubmoduleId(submoduleId);
    setEditingSubmoduleTitle(currentTitle);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, moduleId: string) => {
    if (e.key === "Enter") {
      handleModuleEdit(moduleId);
    } else if (e.key === "Escape") {
      setEditingModuleId(null);
      setEditingModuleTitle("");
    }
  };

  const handleSubmoduleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, submoduleId: string) => {
    if (e.key === "Enter") {
      handleSubmoduleEdit(submoduleId);
    } else if (e.key === "Escape") {
      setEditingSubmoduleId(null);
      setEditingSubmoduleTitle("");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = modules.findIndex((m) => m.id === active.id);
      const newIndex = modules.findIndex((m) => m.id === over.id);

      try {
        const response = await fetch(`/api/modules/reorder`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            moduleId: active.id,
            oldOrder: oldIndex,
            newOrder: newIndex,
            courseId: courseId
          }),
        });

        const contentType = response.headers.get("content-type");
        let errorMessage = "Failed to reorder module";

        if (!response.ok) {
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json().catch(() => null);
            if (data && data.message) {
              errorMessage = data.message;
            }
          } else {
            errorMessage = await response.text().catch(() => errorMessage);
          }
          throw new Error(errorMessage);
        }

        toast({
          title: "Success",
          description: "Module order updated successfully",
        });

        onModuleUpdate();
      } catch (error) {
        console.error("Error reordering module:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to reorder module",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Modules</h2>
        <Button onClick={handleAddModule}>
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={modules.map(m => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {modules.map((module) => (
              <SortableModuleItem
                key={module.id}
                module={module}
                expandedModules={expandedModules}
                expandedSubmodules={expandedSubmodules}
                editingModuleId={editingModuleId}
                editingModuleTitle={editingModuleTitle}
                editingSubmoduleId={editingSubmoduleId}
                editingSubmoduleTitle={editingSubmoduleTitle}
                isDeleting={isDeleting}
                onToggleModule={toggleModule}
                onToggleSubmodule={toggleSubmodule}
                onStartEditing={startEditing}
                onStartEditingSubmodule={startEditingSubmodule}
                onModuleEdit={handleModuleEdit}
                onSubmoduleEdit={handleSubmoduleEdit}
                onModuleDelete={handleModuleDelete}
                onSubmoduleDelete={handleSubmoduleDelete}
                onModuleTitleChange={setEditingModuleTitle}
                onSubmoduleTitleChange={setEditingSubmoduleTitle}
                onAddSubmodule={handleAddSubmodule}
                onKeyPress={handleKeyPress}
                onSubmoduleKeyPress={handleSubmoduleKeyPress}
                setIsDeleting={setIsDeleting}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
} 