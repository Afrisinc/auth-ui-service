import { useState } from "react";
import { useProductEnrollments, useProductAccounts } from "@/hooks/usePlatform";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Layers, ChevronRight, Plus } from "lucide-react";
import { CopyableText } from "@/components/ui/copyable-text";
import { CreateProductDialog } from "@/components/platform/CreateProductDialog";
import type { ProductEnrollment } from "@/types/platform";

export default function AdminProducts() {
  const { data: products, isLoading } = useProductEnrollments();
  const [selectedProduct, setSelectedProduct] = useState<ProductEnrollment | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: accounts, isLoading: accountsLoading } = useProductAccounts(selectedProduct?.productId || "");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">View enrollment stats and manage platform products</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-48" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <Card key={product.productId} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    {product.productName}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
                {(product as ProductEnrollment & { productCode?: string }).productCode && (
                  <div className="mt-2">
                    <CopyableText
                      text={(product as ProductEnrollment & { productCode?: string }).productCode!}
                      truncateAt={20}
                      copyMessage="Product code copied!"
                      className="text-xs"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div><div className="text-2xl font-bold">{product.totalEnrollments}</div><div className="text-xs text-muted-foreground">Total</div></div>
                  <div><div className="text-2xl font-bold text-secondary">{product.active}</div><div className="text-xs text-muted-foreground">Active</div></div>
                  <div><div className="text-2xl font-bold text-destructive">{product.suspended}</div><div className="text-xs text-muted-foreground">Suspended</div></div>
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Badge variant="outline" className="text-xs">FREE: {product.plans.FREE}</Badge>
                  <Badge variant="secondary" className="text-xs">PRO: {product.plans.PRO}</Badge>
                  <Badge className="text-xs">ENT: {product.plans.ENTERPRISE}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.productName} — Enrolled Accounts</DialogTitle>
            <DialogDescription>{selectedProduct?.totalEnrollments} total enrollments</DialogDescription>
          </DialogHeader>
          {accountsLoading ? (
            <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts?.map((acc) => (
                  <TableRow key={acc.id}>
                    <TableCell className="font-mono text-xs">{acc.id}</TableCell>
                    <TableCell><Badge variant="outline">{acc.type}</Badge></TableCell>
                    <TableCell>{acc.ownerName}</TableCell>
                    <TableCell><Badge variant={acc.status === "ACTIVE" ? "default" : "destructive"}>{acc.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DialogContent>
      </Dialog>

      <CreateProductDialog isOpen={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </div>
  );
}
