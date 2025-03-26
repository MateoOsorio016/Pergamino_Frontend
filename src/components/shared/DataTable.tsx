
import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
}

export interface FilterOption {
  value: string;
  label: string;
}

interface DataTableProps<T> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  filterOptions?: {
    placeholder: string;
    options: FilterOption[];
    onFilter: (value: string, data: T[]) => T[];
  };
  searchable?: boolean;
  onSearch?: (searchTerm: string, data: T[]) => T[];
  renderActions?: (item: T) => React.ReactNode;
  renderTopActions?: () => React.ReactNode;
  itemsPerPage?: number;
}

export function DataTable<T>({
  title,
  description,
  data,
  columns,
  keyExtractor,
  filterOptions,
  searchable = true,
  onSearch,
  renderActions,
  renderTopActions,
  itemsPerPage = 5,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState<string>(filterOptions?.options[0]?.value || 'all');
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // Apply filters, sorting, and pagination
  const processedData = useMemo(() => {
    let filteredData = [...data];
    
    // Apply search filter
    if (searchTerm && onSearch) {
      filteredData = onSearch(searchTerm, filteredData);
    }
    
    // Apply filter options
    if (filterValue && filterOptions?.onFilter) {
      filteredData = filterOptions.onFilter(filterValue, filteredData);
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a: any, b: any) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredData;
  }, [data, searchTerm, filterValue, sortConfig, onSearch, filterOptions]);

  // Calculate pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedData.slice(startIndex, startIndex + itemsPerPage);
  }, [processedData, currentPage, itemsPerPage]);

  // Sorting handler
  const handleSort = (key: string) => {
    setSortConfig(prevSortConfig => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-pergamino-darkTeal/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-sumana text-pergamino-darkTeal">
              {title}
            </CardTitle>
            {description && (
              <p className="mt-1 text-pergamino-darkTeal/70">
                {description}
              </p>
            )}
          </div>
          {renderTopActions && renderTopActions()}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {searchable && (
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pergamino-darkTeal/50 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-pergamino-teal/30 focus:border-pergamino-teal"
                />
              </div>
            )}
            
            {filterOptions && (
              <div className="w-full md:w-48">
                <Select
                  value={filterValue}
                  onValueChange={setFilterValue}
                >
                  <SelectTrigger className="border-pergamino-teal/30">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-pergamino-darkTeal/70" />
                      <SelectValue placeholder={filterOptions.placeholder} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="rounded-md border border-pergamino-teal/20 overflow-hidden">
            <Table>
              <TableHeader className="bg-pergamino-cream/50">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead 
                      key={column.key}
                      className={`${
                        column.align === 'right' ? 'text-right' : 
                        column.align === 'center' ? 'text-center' : 'text-left'
                      } ${column.sortable ? 'cursor-pointer hover:text-pergamino-blue' : ''}`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      {column.header}
                      {sortConfig.key === column.key && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </TableHead>
                  ))}
                  {renderActions && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow 
                      key={keyExtractor(item)}
                      className="hover:bg-pergamino-cream/20 transition-colors"
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={`${keyExtractor(item)}-${column.key}`} 
                          className={column.align === 'right' ? 'text-right' : 
                                     column.align === 'center' ? 'text-center' : ''
                          }
                        >
                          {column.cell(item)}
                        </TableCell>
                      ))}
                      {renderActions && (
                        <TableCell className="text-right">
                          {renderActions(item)}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length + (renderActions ? 1 : 0)} 
                      className="text-center h-24 text-muted-foreground"
                    >
                      No data found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {processedData.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-pergamino-darkTeal/70">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, processedData.length)} of {processedData.length} items
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-pergamino-darkTeal">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="h-8 w-8 border-pergamino-teal/30"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
